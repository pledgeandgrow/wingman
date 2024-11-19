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
      question: "Frequently Asked Questions",
      answer: "These are some of the most common queries we receive and their answers."
    },
    {
      question: "The basics of welcoming travelers",
      answer: "Make travelers feel at home by providing clear instructions and a warm welcome."
    },
    {
      question: "How do I list my property?",
      answer: "You can list your property by navigating to the 'List Your Property' section on our website."
    }
  ];

  return (
    <section className="py-10 px-4 bg-gray-50 w-[80%] m-auto">
      <h2 className="text-xl md:text-3xl font-semibold mb-4 text-center">Answers to your questions</h2>
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
