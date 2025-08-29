import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import validator from 'validator';

const resend = new Resend(process.env.RESEND_API_KEY);

const newsletterSchema = z.object({
  emailAddress: z.string()
    .min(1, 'Email is required')
    .refine((val) => validator.isEmail(val), 'Please enter a valid email address')
    .refine((val) => {
      const domain = val.split('@')[1];
      return domain.length >= 4 && !domain.includes('test') && !domain.includes('fake');
    }, 'Please enter a valid email address')
    .transform(val => val.trim().toLowerCase()),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = newsletterSchema.parse(body);
    
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a365d; color: white; padding: 20px; text-align: center;">
          <h1>New Newsletter Subscription</h1>
        </div>
        
        <div style="padding: 30px; background: #f7fafc;">
          <h2 style="color: #2d3748; margin-bottom: 20px;">Subscription Details</h2>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Email Address:</strong>
            <div style="margin-top: 5px;"><a href="mailto:${validatedData.emailAddress}">${validatedData.emailAddress}</a></div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Subscription Type:</strong>
            <div style="margin-top: 5px;">Newsletter Subscription</div>
          </div>
          
          <div style="margin-bottom: 15px;">
            <strong style="color: #4a5568;">Source:</strong>
            <div style="margin-top: 5px;">Website Footer</div>
          </div>
        </div>
        
        <div style="background: #e2e8f0; padding: 15px; text-align: center; color: #718096; font-size: 12px;">
          This subscription was made on ${new Date().toLocaleString()}
        </div>
      </div>
    `;

    const result = await resend.emails.send({
      from: 'Newsletter <onboarding@resend.dev>',
      to: [process.env.NEWSLETTER_EMAIL || 'connect@sehatlings.com'],
      subject: `New Newsletter Subscription: ${validatedData.emailAddress}`,
      html: emailHtml,
      replyTo: validatedData.emailAddress,
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Subscription successful',
      id: result.data?.id 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Validation failed', errors: error.issues },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: 'Failed to process subscription' },
      { status: 500 }
    );
  }
}