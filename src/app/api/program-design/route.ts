import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const programDesignSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must be less than 100 characters')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address'),
  contactNumber: z.string()
    .min(1, 'Contact number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }),
      'Please enter a valid phone number'),
  currentRole: z.string()
    .min(2, 'Current role must be at least 2 characters')
    .max(100, 'Current role must be less than 100 characters')
    .transform(val => val.trim()),
  currentOrganization: z.string()
    .min(2, 'Organization name must be at least 2 characters')
    .max(100, 'Organization name must be less than 100 characters')
    .transform(val => val.trim()),
  programInterest: z.string()
    .min(2, 'Program interest must be at least 2 characters')
    .max(200, 'Program interest must be less than 200 characters')
    .transform(val => val.trim()),
  plannedKPIs: z.string()
    .min(10, 'Planned KPIs must be at least 10 characters')
    .max(1000, 'Planned KPIs must be less than 1000 characters')
    .transform(val => val.trim()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = programDesignSchema.parse(body);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5b0203; color: white; padding: 20px; text-align: center;">
          <h1>New Program Design Application</h1>
        </div>

        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Personal Information</h2>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Full Name:</strong>
            <div style="margin-top: 5px;">${validatedData.fullName}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Email:</strong>
            <div style="margin-top: 5px;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Contact Number:</strong>
            <div style="margin-top: 5px;">${validatedData.contactNumber}</div>
          </div>

          <h2 style="color: #2d3748; margin-top: 30px; margin-bottom: 20px;">Professional Information</h2>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Current Role/Title:</strong>
            <div style="margin-top: 5px;">${validatedData.currentRole}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Current Organization:</strong>
            <div style="margin-top: 5px;">${validatedData.currentOrganization}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Program Interest:</strong>
            <div style="margin-top: 5px; background: white; padding: 10px; border-left: 4px solid #5b0203;">${validatedData.programInterest}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Planned KPIs:</strong>
            <div style="margin-top: 5px; background: white; padding: 15px; border-left: 4px solid #5b0203; white-space: pre-wrap;">${validatedData.plannedKPIs}</div>
          </div>
        </div>

        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This application was submitted from the Professional Development Programs form on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Program Design <noreply@sehatlings.com>',
      to: [process.env.CONTACT_EMAIL || 'connect@sehatlings.com'],
      subject: `Program Design Application: ${validatedData.fullName} - ${validatedData.programInterest}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    return NextResponse.json({
      success: true,
      message: 'Program design application submitted successfully',
      id: result.data?.id
    });

  } catch (error) {
    console.error('Program design application error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
