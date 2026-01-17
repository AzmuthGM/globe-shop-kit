import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    category: 'Orders & Payments',
    questions: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) through Stripe, as well as PayPal. All transactions are secured with industry-standard encryption.',
      },
      {
        question: 'How can I track my order?',
        answer: 'Once your order ships, you\'ll receive an email with a tracking number. You can use this number to track your package on the carrier\'s website. You can also log into your account to view order status.',
      },
      {
        question: 'Can I modify or cancel my order?',
        answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, the order enters processing and cannot be changed. Please contact us immediately if you need to make changes.',
      },
      {
        question: 'Do you offer price matching?',
        answer: 'We strive to offer competitive prices but do not currently offer price matching. However, sign up for our newsletter to receive exclusive discounts and early access to sales.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping to the US takes 5-7 business days. EU deliveries typically take 7-10 business days. Express shipping options are available at checkout for faster delivery.',
      },
      {
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free standard shipping on all orders over $75 USD. Orders under $75 have a flat shipping rate of $9.99.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'We currently ship to all 50 US states and most EU countries including UK, Germany, France, Italy, Spain, Netherlands, and more. Contact us if your country isn\'t listed at checkout.',
      },
      {
        question: 'What happens if my package is lost?',
        answer: 'If your tracking shows your package as delivered but you haven\'t received it, please contact us within 48 hours. We\'ll work with the carrier to investigate and may send a replacement or issue a refund.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging, and in resalable condition. Some exceptions apply to personal care items and opened electronics.',
      },
      {
        question: 'How do I start a return?',
        answer: 'To initiate a return, contact our support team with your order number and reason for return. We\'ll provide you with a prepaid return label and instructions.',
      },
      {
        question: 'How long do refunds take?',
        answer: 'Once we receive your return, refunds are processed within 3-5 business days. The refund will appear on your original payment method within 5-10 business days depending on your bank.',
      },
      {
        question: 'Do you offer exchanges?',
        answer: 'We don\'t currently offer direct exchanges. To get a different size or color, please return the original item for a refund and place a new order.',
      },
    ],
  },
  {
    category: 'Products & Warranty',
    questions: [
      {
        question: 'Are your products authentic?',
        answer: 'Yes, all products sold on Azm Store are 100% authentic. We work directly with authorized distributors and manufacturers to ensure quality and authenticity.',
      },
      {
        question: 'Do products come with a warranty?',
        answer: 'Warranty coverage varies by product and manufacturer. Electronics typically include a 1-year manufacturer warranty. Check the product page for specific warranty information.',
      },
      {
        question: 'How do I know what size to order?',
        answer: 'Size guides are available on applicable product pages. If you\'re unsure, our customer service team can help you find the right size based on your measurements.',
      },
    ],
  },
];

const FAQ: React.FC = () => {
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="section-heading">Frequently Asked Questions</h1>
            <p className="section-subheading mx-auto">
              Find answers to common questions about orders, shipping, and more.
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((category) => (
              <div key={category.category}>
                <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="bg-secondary rounded-lg px-4"
                    >
                      <AccordionTrigger className="text-left hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-secondary rounded-xl">
            <h3 className="font-semibold text-lg mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is here to help you.
            </p>
            <Button asChild className="btn-premium text-primary-foreground">
              <Link to="/contact">Contact Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
