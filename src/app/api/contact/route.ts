import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactFormSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters')
    .regex(/^[a-zA-Z\s\-'\.]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes')
    .transform(val => val.trim()),
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .refine((val) => validator.isMobilePhone(val.replace(/\s/g, ''), 'any', { strictMode: false }), 
      'Please enter a valid phone number'),
  emailAddress: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address')
    .refine((val) => {
      const hasAt = typeof val === 'string' && val.includes('@');
      const domain = hasAt ? val.split('@')[1] : '';
      if (!domain) return false;
      
      // Only reject obviously fake domains
      const fakeDomains = ['test.com', 'fake.com', 'example.com', 'sadff.com', 'asdf.com', 'temp.com'];
      if (fakeDomains.includes(domain)) return false;
      
      // Allow all major email providers
      const trustedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
      if (trustedDomains.includes(domain)) return true;
      
      // For other domains, just check basic structure
      const domainParts = domain.split('.');
      if (domainParts.length < 2) return false;
      
      const tld = domainParts[domainParts.length - 1];
      if (tld.length < 2 || tld.length > 6) return false;
      
      return domain.length >= 4;
    }, 'Please enter a valid email address'),
  reason: z.string().min(1, 'Please select a reason'),
  message: z.string()
    .max(1000, 'Message must be less than 1000 characters')
    .optional()
    .transform(val => val?.trim()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = contactFormSchema.parse(body);
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 20px; text-align: center;">
          <h1>New Contact Form Submission</h1>
        </div>
        
        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Contact Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Full Name:</strong>
            <div style="margin-top: 5px;">${validatedData.fullName}</div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Email:</strong>
            <div style="margin-top: 5px;"><a href="mailto:${validatedData.emailAddress}">${validatedData.emailAddress}</a></div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Phone:</strong>
            <div style="margin-top: 5px;">${validatedData.phoneNumber}</div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Reason for Contact:</strong>
            <div style="margin-top: 5px;">${validatedData.reason}</div>
          </div>
          
          ${validatedData.message ? `
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Message:</strong>
            <div style="margin-top: 5px; background: white; padding: 15px; border-left: 4px solid #1a365d; white-space: pre-wrap;">${validatedData.message}</div>
          </div>
          ` : ''}
        </div>
        
        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This email was sent from the Sehatlings contact form on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'contact@sehatlings.com'],
      subject: `New Contact: ${validatedData.fullName} - ${validatedData.reason}`,
      html: emailHtml,
      replyTo: validatedData.emailAddress,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      id: result.data?.id 
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
}