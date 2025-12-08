import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const consultationSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address'),
  organization: z.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters')
    .transform(val => val.trim()),
  package: z.string()
    .min(1, 'Please select a package')
    .refine(val => ['Essential Compliance Check', 'Comprehensive Compliance Solution'].includes(val),
      'Please select a valid package'),
  additional: z.string()
    .optional()
    .refine((val) => !val || val.length <= 500, 'Additional information must be less than 500 characters')
    .transform(val => val?.trim()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = consultationSchema.parse(body);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5b0203; color: white; padding: 20px; text-align: center;">
          <h1>New Consultation Request</h1>
        </div>

        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Consultation Details</h2>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Name:</strong>
            <div style="margin-top: 5px;">${validatedData.firstName} ${validatedData.lastName}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Email:</strong>
            <div style="margin-top: 5px;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Organization:</strong>
            <div style="margin-top: 5px;">${validatedData.organization}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Package Selected:</strong>
            <div style="margin-top: 5px; background: white; padding: 10px; border-left: 4px solid #5b0203;">${validatedData.package}</div>
          </div>

          ${validatedData.additional ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Additional Information:</strong>
            <div style="margin-top: 5px; background: white; padding: 15px; border-left: 4px solid #5b0203; white-space: pre-wrap;">${validatedData.additional}</div>
          </div>
          ` : ''}
        </div>

        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This consultation request was submitted from the Inspection Consultancy form on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Consultation Request <noreply@sehatlings.com>',
      to: ['engramhk@gmail.com'],
      subject: `Consultation Request: ${validatedData.firstName} ${validatedData.lastName} - ${validatedData.package}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    return NextResponse.json({
      success: true,
      message: 'Consultation request submitted successfully',
      id: result.data?.id
    });

  } catch (error) {
    console.error('Consultation request error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit request' },
      { status: 500 }
    );
  }
}
