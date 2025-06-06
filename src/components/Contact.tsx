
import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, Phone, Globe } from 'lucide-react';
import portfolioData from '../data/portfolio.json';
import { useToast } from '@/hooks/use-toast';
import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  const { personal } = portfolioData;
  const { toast } = useToast();
  const [state, handleSubmit] = useForm("mgvyvdkd");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle success state
  useEffect(() => {
    if (state.succeeded) {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      // Reset form data
      setFormData({ name: '', email: '', message: '' });
    }
  }, [state.succeeded, toast]);

  // Handle error state
  useEffect(() => {
    if (state.errors && Array.isArray(state.errors) && state.errors.length > 0) {
      toast({
        title: "Error sending message",
        description: "Please check your form and try again.",
        variant: "destructive",
      });
    }
  }, [state.errors, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Let's Connect</h3>
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  I'd love to hear from you! Whether you have a project in mind, want to collaborate, or just want to say hello, feel free to reach out.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <a href={`mailto:${personal.email}`} className="text-blue-600 hover:text-blue-700">
                      {personal.email}
                    </a>
                  </div>
                </div>

                {personal.phone && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <a href={`tel:${personal.phone}`} className="text-green-600 hover:text-green-700">
                        {personal.phone}
                      </a>
                    </div>
                  </div>
                )}
                
                {personal.linkedin && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Linkedin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">LinkedIn</h4>
                      <a 
                        href={personal.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        Connect with me
                      </a>
                    </div>
                  </div>
                )}

                {personal.github && (
                  <div className="flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                      <Github className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">GitHub</h4>
                      <a 
                        href={personal.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-700"
                      >
                        View my code
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Contact Form with Formspree Integration */}
            <div className="bg-white rounded-lg shadow-md p-6">
              {state.succeeded ? (
                <div className="text-center py-6">
                  <div className="mb-3 text-green-600">
                    <Mail className="w-12 h-12 mx-auto mb-3" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">The raven has flown!</h3>
<p className="text-gray-600">Your message is heard. A reply is coming.</p>

                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                      placeholder="Enter your full name"
                    />
                    <ValidationError 
                      prefix="Name" 
                      field="name"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors"
                      placeholder="Enter your email address"
                    />
                    <ValidationError 
                      prefix="Email" 
                      field="email"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                    <ValidationError 
                      prefix="Message" 
                      field="message"
                      errors={state.errors}
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  
                  {/* Hidden input for better subject line */}
                  <input type="hidden" name="_subject" value="New Portfolio Contact Form Submission" />
                  
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {state.submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
