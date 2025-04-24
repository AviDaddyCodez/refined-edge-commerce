
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2, User, Mail, Lock } from 'lucide-react';
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import NeonGridLines from "@/components/NeonGridLines";
import { useAuth } from "@/context/AuthContext";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type AuthMode = 'login' | 'signup';

// Form schema for login - using less strict email validation
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

// Form schema for signup with extra fields
const signupSchema = loginSchema.extend({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthPage = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Signup form
  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log("Attempting login with:", data.email);
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        console.error("Login error:", error);
        toast.error(error.message);
      } else {
        toast.success('Successfully logged in!');
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      console.log("Attempting signup with:", data.email);
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        toast.error(error.message);
      } else {
        toast.success('Account created successfully! Please check your email to verify your account.');
        setAuthMode('login');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative bg-deep-purple">
      <NeonGridLines className="fixed inset-0" opacity={0.15} />
      <Navigation />
      <div className="container mx-auto px-4 pt-28 pb-16">
        <div className="max-w-md mx-auto glass-card p-8 border border-white/10 rounded-xl backdrop-blur-md shadow-glow">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              {authMode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-white/70">
              {authMode === 'login'
                ? 'Sign in to your EcoNeon account'
                : 'Join the neon revolution today'}
            </p>
          </div>

          {authMode === 'login' ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                          <Input
                            placeholder="your.email@example.com"
                            className="bg-white/10 border-white/20 text-white pl-10"
                            autoComplete="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="bg-white/10 border-white/20 text-white pl-10"
                            autoComplete="current-password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-electric-violet hover:bg-electric-violet/90 py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                          <Input
                            placeholder="Your name"
                            className="bg-white/10 border-white/20 text-white pl-10"
                            autoComplete="name"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                          <Input
                            placeholder="your.email@example.com"
                            className="bg-white/10 border-white/20 text-white pl-10"
                            autoComplete="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 h-4 w-4" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="bg-white/10 border-white/20 text-white pl-10"
                            autoComplete="new-password"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-electric-violet hover:bg-electric-violet/90 py-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center">
            <p className="text-white/70">
              {authMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                className="text-electric-violet hover:underline"
              >
                {authMode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
