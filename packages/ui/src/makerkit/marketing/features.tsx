import { Check } from "lucide-react";
import { Badge } from "../../shadcn/badge";


export const Features = () => (
  <div className="container ">
    <div className="container mx-auto">
      <div className="flex gap-4  flex-col items-start">
        <div>
          <Badge>Features we&apos;ve built</Badge>
        </div>
        <div className="flex gap-2 flex-col">
          <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
            We know what you need
          </h2>
          <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
            Do you know when you want to start your Startup? You need to think about the features you want to have. We&apos;ve built the most important features for you.
          </p>
        </div>
        <div className="flex gap-10 pt-12 flex-col w-full">
          <div className="grid grid-cols-2 items-start lg:grid-cols-3 gap-10">
            <div className="flex flex-row gap-6 w-full items-start">
              <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Authentication</p>
                <p className="text-muted-foreground text-sm">
                    Full authentication flow with password, magic link, and social login.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Multi-Factor Auth</p>
                <p className="text-muted-foreground text-sm">
                    Support for Multi-Factor Authentication with Supabase Auth.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Payments</p>
                <p className="text-muted-foreground text-sm">
                    Integrate SaaS subscriptions and payments with Stripe or Lemon Squeezy.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 w-full items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Customer Portal</p>
                <p className="text-muted-foreground text-sm">
                Manage subscriptions with Stripe&apos;s Customer Portal.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Multi Tenancy</p>
                <p className="text-muted-foreground text-sm">
                    Create multiple organizations and invite teammates.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Super Admin</p>
                <p className="text-muted-foreground text-sm">
                    Manage, impersonate, or disable users with our Super Admin.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Dashboard</p>
                <p className="text-muted-foreground text-sm">
                    Beautiful charts with Recharts and data from Supabase.
                    Every project needs a dashboard.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Dark Theme</p>
                <p className="text-muted-foreground text-sm">
                    Light and Dark themes available with a simple toggle.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Blog</p>
                <p className="text-muted-foreground text-sm">
                    Integrated blog with MDX to facilitate content creation.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Documentation</p>
                <p className="text-muted-foreground text-sm">
                Comprehensive documentation with MDX where you can add your own content.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Mobile Friendly</p>
                <p className="text-muted-foreground text-sm">
                Optimized for mobile devices with a responsive design.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Custom Emails</p>
                <p className="text-muted-foreground text-sm">
                Send custom emails for your users easily and quickly.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Feedback</p>
                <p className="text-muted-foreground text-sm">
                Collect feedback from your users with our integrated feedback form. You don&apos;t need to use a third-party service.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Waitlist</p>
                <p className="text-muted-foreground text-sm">
                Start collecting emails from your users with our integrated waitlist since day one.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Analytics</p>
                <p className="text-muted-foreground text-sm">
                Track your users&apos; behavior with our integrated analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
