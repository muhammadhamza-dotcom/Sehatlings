import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const earlyAccessSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address'),
  industry: z.string()
    .min(1, 'Please select an industry'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }),
      'Please enter a valid phone number'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = earlyAccessSchema.parse(body);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5b0203; color: white; padding: 20px; text-align: center;">
          <h1>New Early Access Registration</h1>
        </div>

        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Registration Information</h2>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Name:</strong>
            <div style="margin-top: 5px;">${validatedData.name}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Email:</strong>
            <div style="margin-top: 5px;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Industry:</strong>
            <div style="margin-top: 5px;">${validatedData.industry}</div>
          </div>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Phone:</strong>
            <div style="margin-top: 5px;">${validatedData.phone}</div>
          </div>
        </div>

        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This registration was submitted from the GENDLR Early Access form on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Early Access Registration <noreply@sehatlings.com>',
      to: ['engramhk@gmail.com'],
      subject: `Early Access Registration: ${validatedData.name}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    return NextResponse.json({
      success: true,
      message: 'Early access registration submitted successfully',
      id: result.data?.id
    });

  } catch (error) {
    console.error('Early access registration error:', error);

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
