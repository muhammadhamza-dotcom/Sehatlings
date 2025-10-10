import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const labRegistrationSchema = z.object({
  labName: z.string()
    .min(2, 'Lab name must be at least 2 characters')
    .max(100, 'Lab name must be less than 100 characters')
    .transform(val => val.trim()),
  contactName: z.string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(50, 'Contact name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Contact name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }),
      'Please enter a valid phone number'),
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters')
    .transform(val => val.trim()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = labRegistrationSchema.parse(body);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5b0203; color: white; padding: 20px; text-align: center;">
          <h1>New Lab Registration</h1>
        </div>

        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Lab Information</h2>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Lab Name:</strong>
            <div style="margin-top: 5px;">${validatedData.labName}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Lab Director/Primary Contact:</strong>
            <div style="margin-top: 5px;">${validatedData.contactName}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Email:</strong>
            <div style="margin-top: 5px;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Phone:</strong>
            <div style="margin-top: 5px;">${validatedData.phone}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Lab Address:</strong>
            <div style="margin-top: 5px; background: white; padding: 15px; border-left: 4px solid #5b0203; white-space: pre-wrap;">${validatedData.address}</div>
          </div>
        </div>

        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This registration was submitted from the GENDLR B2B Solution form on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Lab Registration <noreply@sehatlings.com>',
      to: [process.env.CONTACT_EMAIL || 'connect@sehatlings.com'],
      subject: `Lab Registration: ${validatedData.labName}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    return NextResponse.json({
      success: true,
      message: 'Lab registration submitted successfully',
      id: result.data?.id
    });

  } catch (error) {
    console.error('Lab registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit registration' },
      { status: 500 }
    );
  }
}
