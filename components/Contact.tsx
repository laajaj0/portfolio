import React, { FormEvent, useState } from 'react';
import { useData } from '../context/DataContext';
import emailjs from '@emailjs/browser';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useData();
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // --- EMAILJS CONFIGURATION ---
    const serviceID = 'service_a64evbn';
    const templateID = 'template_zm664ua';
    const publicKey = 'm0_r6J9t9oZ8_12lo';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setStatus('error');
      });
  };

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-28">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{t('contact_title')}</h2>
          <p className="text-gray-600 text-lg">
            {t('contact_subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t('contact_name')}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder-gray-400"
              required
              disabled={status === 'loading'}
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('contact_email')}
              className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all placeholder-gray-400"
              required
              disabled={status === 'loading'}
            />
          </div>
          
          <textarea 
            rows={6}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t('contact_message')}
            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-6 py-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all resize-none placeholder-gray-400"
            required
            disabled={status === 'loading'}
          ></textarea>

          <button 
            type="submit"
            disabled={status === 'loading'}
            className={`w-full font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2
              ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#111] hover:bg-black hover:shadow-xl hover:-translate-y-0.5 text-white'}
            `}
          >
            {status === 'loading' ? (
              <><Loader2 className="animate-spin" /> Sending...</>
            ) : status === 'success' ? (
              <><CheckCircle /> Sent Successfully!</>
            ) : status === 'error' ? (
              <><AlertCircle /> Failed to Send. Try again.</>
            ) : (
              t('contact_send')
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;