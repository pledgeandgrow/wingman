"use client";

// components/FAQSection.js
import { useState } from 'react';

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpen(open === index ? null : index);
  };

  // Questions and answers data
  const faqs = [
    {
      question: "How does Wingman work?",
      answer: "Wingmen post their flight details, and senders request item deliveries. Once accepted, Wingmen carry the items to the recipient safely."
    },
    {
      question: "Is it safe to send items with a Wingman?",
      answer: "Yes, all Wingmen are verified, and items must comply with airline and legal regulations."
    },
    {
      question: "What if a Wingman cancels or fails to deliver?",
      answer: "We’ll notify you and help find a replacement. If delivery fails, we’ll investigate and resolve the issue as per our policy."
    }
  ];

  return (
    <section className="py-10 px-4 bg-gray-50 w-[80%] m-auto">
      <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="w-[] p-4 mx-auto bg-white border rounded-xl shadow-md"
            onClick={() => toggleFaq(index)}
          >

            <h3 className="text-lg font-medium">{faq.question}</h3>
            
            {open === index && <p className="text-gray-600 mt-2">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
