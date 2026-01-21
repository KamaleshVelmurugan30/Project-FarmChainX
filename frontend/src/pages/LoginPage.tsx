// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuthStore } from '@/store';
// import { toast } from '@/hooks/use-toast';
// import { demoCredentials } from '@/data/mockData';

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const { login } = useAuthStore();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const success = await login(email, password);
//       if (success) {
//         toast({
//           title: 'Welcome back!',
//           description: 'You have successfully logged in.',
//         });
//         navigate('/dashboard');
//       } else {
//         toast({
//           title: 'Login failed',
//           description: 'Invalid email or password. Try demo credentials below.',
//           variant: 'destructive',
//         });
//       }
//     } catch {
//       toast({
//         title: 'Error',
//         description: 'Something went wrong. Please try again.',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDemoLogin = async (role: keyof typeof demoCredentials) => {
//     const creds = demoCredentials[role];
//     setEmail(creds.email);
//     setPassword(creds.password);
//     setIsLoading(true);

//     try {
//       const success = await login(creds.email, creds.password);
//       if (success) {
//         toast({
//           title: `Demo ${role} account`,
//           description: 'Logged in with demo credentials.',
//         });
//         navigate('/dashboard');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Panel - Branding */}
//       <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxam0tMjIgNmgyVjIyaC0ydjE0em00LTI4aDJ2MmgtMnYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        
//         <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="flex items-center gap-4 mb-8">
//               <div className="w-16 h-16 rounded-2xl gradient-golden flex items-center justify-center shadow-lg">
//                 <Leaf className="w-9 h-9 text-soil-dark" />
//               </div>
//               <div>
//                 <h1 className="text-4xl font-bold">FarmChainX</h1>
//                 <p className="text-primary-foreground/80">Farm to Fork Traceability</p>
//               </div>
//             </div>

//             <h2 className="text-3xl font-bold mb-4">
//               Transparent Agricultural<br />Supply Chain
//             </h2>
//             <p className="text-lg text-primary-foreground/80 max-w-md">
//               Track every step of your produce journey with AI-powered quality scoring, 
//               real-time transport tracking, and immutable audit trails.
//             </p>

//             <div className="mt-12 grid grid-cols-2 gap-6">
//               {[
//                 { label: 'Farms Tracked', value: '2,500+' },
//                 { label: 'Batches Verified', value: '150K+' },
//                 { label: 'Quality Accuracy', value: '99.2%' },
//                 { label: 'Countries', value: '24' },
//               ].map((stat) => (
//                 <div key={stat.label} className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-4">
//                   <p className="text-2xl font-bold">{stat.value}</p>
//                   <p className="text-sm text-primary-foreground/70">{stat.label}</p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* Right Panel - Login Form */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-background">
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.4 }}
//           className="w-full max-w-md"
//         >
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
//             <div className="w-12 h-12 rounded-xl gradient-nature flex items-center justify-center">
//               <Leaf className="w-7 h-7 text-primary-foreground" />
//             </div>
//             <span className="text-2xl font-bold">FarmChainX</span>
//           </div>

//           <Card variant="elevated" className="border-0 shadow-xl">
//             <CardHeader className="text-center pb-2">
//               <CardTitle className="text-2xl">Welcome Back</CardTitle>
//               <CardDescription>
//                 Sign in to your account to continue
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <label htmlFor="email" className="text-sm font-medium">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       id="email"
//                       type="email"
//                       placeholder="you@example.com"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="pl-10"
//                       required
//                       aria-label="Email address"
//                     />
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label htmlFor="password" className="text-sm font-medium">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       id="password"
//                       type={showPassword ? 'text' : 'password'}
//                       placeholder="••••••••"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="pl-10 pr-10"
//                       required
//                       aria-label="Password"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
//                       aria-label={showPassword ? 'Hide password' : 'Show password'}
//                     >
//                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   variant="farm"
//                   size="lg"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Signing in...' : 'Sign In'}
//                   <ArrowRight className="w-4 h-4 ml-2" />
//                 </Button>
//               </form>

//               <div className="mt-6">
//                 <div className="relative">
//                   <div className="absolute inset-0 flex items-center">
//                     <div className="w-full border-t border-border" />
//                   </div>
//                   <div className="relative flex justify-center text-xs uppercase">
//                     <span className="bg-card px-2 text-muted-foreground">
//                       Or try demo accounts
//                     </span>
//                   </div>
//                 </div>

//                 <div className="mt-4 grid grid-cols-2 gap-2">
//                   {(['farmer', 'distributor', 'admin', 'customer'] as const).map((role) => (
//                     <Button
//                       key={role}
//                       variant="outline"
//                       size="sm"
//                       onClick={() => handleDemoLogin(role)}
//                       disabled={isLoading}
//                       className="capitalize"
//                     >
//                       {role}
//                     </Button>
//                   ))}
//                 </div>
//               </div>

//               <p className="mt-6 text-center text-sm text-muted-foreground">
//                 Don't have an account?{' '}
//                 <Link to="/register" className="text-primary font-medium hover:underline">
//                   Sign up
//                 </Link>
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { useAuthStore } from '@/store';
// import { toast } from '@/hooks/use-toast';

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const { login } = useAuthStore();

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     try {
//       const success = await login(email, password);

//       if (success) {
//         toast({
//           title: 'Welcome back!',
//           description: 'You have successfully logged in.',
//         });
//         navigate('/dashboard');
//       } else {
//         toast({
//           title: 'Login failed',
//           description: 'Invalid username or password',
//           variant: 'destructive',
//         });
//       }
//     } catch (err) {
//       toast({
//         title: 'Server error',
//         description: 'Backend not reachable',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Panel */}
//       <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
//         <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
//           <div className="flex items-center gap-4 mb-8">
//             <div className="w-16 h-16 rounded-2xl gradient-golden flex items-center justify-center shadow-lg">
//               <Leaf className="w-9 h-9 text-soil-dark" />
//             </div>
//             <div>
//               <h1 className="text-4xl font-bold">FarmChainX</h1>
//               <p className="text-primary-foreground/80">Farm to Fork Traceability</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="flex-1 flex items-center justify-center p-8 bg-background">
//         <motion.div className="w-full max-w-md">
//           <Card className="border-0 shadow-xl">
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl">Welcome Back</CardTitle>
//               <CardDescription>Sign in to continue</CardDescription>
//             </CardHeader>

//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <label>Email</label>
//                   <div className="relative">
//                     <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       className="pl-10"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label>Password</label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
//                     <Input
//                       type={showPassword ? 'text' : 'password'}
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       className="pl-10 pr-10"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3"
//                     >
//                       {showPassword ? <EyeOff /> : <Eye />}
//                     </button>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? 'Signing in...' : 'Sign In'}
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </Button>
//               </form>

//               <p className="mt-6 text-center text-sm">
//                 Don't have an account?{' '}
//                 <Link to="/register" className="text-primary font-medium">
//                   Sign up
//                 </Link>
//               </p>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </div>
//   );
// }
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/store';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [role, setRole] = useState<'ADMIN' | 'FARMER' | 'CUSTOMER'>('CUSTOMER');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // ✅ PASS ROLE HERE (CRITICAL FIX)
      const success = await login(email, password);

      if (success) {
        toast({
          title: 'Welcome back!',
          description: `Logged in Successfully.`,
        });
        navigate('/dashboard');
      } else {
        toast({
          title: 'Login failed',
          description: 'Invalid credentials',
          variant: 'destructive',
        });
      }
    } catch {
      toast({
        title: 'Server error',
        description: 'Backend not reachable',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-golden flex items-center justify-center shadow-lg">
              <Leaf className="w-9 h-9 text-soil-dark" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">FarmChainX</h1>
              <p className="text-primary-foreground/80">
                Farm to Fork Traceability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div className="w-full max-w-md">
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>Sign in to continue</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label>Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label>Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {/* ✅ ROLE SELECTOR (KEY FIX) */}
                {/* <div>
                  <label>Login as</label>
                  <select
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as 'ADMIN' | 'FARMER' | 'CUSTOMER')
                    }
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="CUSTOMER">Customer</option>
                    <option value="FARMER">Farmer</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div> */}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </form>

              <p className="mt-6 text-center text-sm">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-medium">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
