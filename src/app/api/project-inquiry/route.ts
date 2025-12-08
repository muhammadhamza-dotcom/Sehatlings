import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const projectInquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  email: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }),
      'Please enter a valid phone number'),
  projectDetails: z.string()
    .min(10, 'Project details must be at least 10 characters')
    .max(500, 'Project details must be less than 500 characters')
    .transform(val => val.trim()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData = projectInquirySchema.parse(body);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #5b0203; color: white; padding: 20px; text-align: center;">
          <h1>New Project Inquiry</h1>
        </div>

        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Project Information</h2>

          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Name:</strong>
            <div style="margin-top: 5px;">${validatedData.name}</div>
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
            <strong style="color: #4a5568;">Project Details:</strong>
            <div style="margin-top: 5px; background: white; padding: 15px; border-left: 4px solid #5b0203; white-space: pre-wrap;">${validatedData.projectDetails}</div>
          </div>
        </div>

        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This inquiry was submitted from the Tech House project inquiry form on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Project Inquiry <noreply@sehatlings.com>',
      to: ['engramhk@gmail.com'],
      subject: `Project Inquiry: ${validatedData.name}`,
      html: emailHtml,
      replyTo: validatedData.email,
    });

    return NextResponse.json({
      success: true,
      message: 'Project inquiry submitted successfully',
      id: result.data?.id
    });

  } catch (error) {
    console.error('Project inquiry error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
