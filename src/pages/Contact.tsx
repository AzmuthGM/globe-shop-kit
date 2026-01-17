import React from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Contact: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="section-heading">Get in Touch</h1>
            <p className="section-subheading mx-auto">
              Have a question or feedback? We'd love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-secondary rounded-xl p-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:support@azmstore.com" className="text-muted-foreground hover:text-foreground text-sm">
                        support@azmstore.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+15551234567" className="text-muted-foreground hover:text-foreground text-sm">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground text-sm">
                        123 Commerce Street<br />
                        Suite 100<br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground text-sm">
                        Mon - Fri: 9am - 6pm EST<br />
                        Sat - Sun: 10am - 4pm EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="order">Order Inquiry</SelectItem>
                      <SelectItem value="product">Product Question</SelectItem>
                      <SelectItem value="shipping">Shipping & Delivery</SelectItem>
                      <SelectItem value="return">Returns & Refunds</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="order-number">Order Number (if applicable)</Label>
                  <Input id="order-number" placeholder="e.g., AZM-123456" />
                </div>

                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="btn-premium text-primary-foreground">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
