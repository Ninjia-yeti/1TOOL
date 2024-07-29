import { Card, CardContent, CardHeader, CardTitle } from "../../shadcn/card";
import { GiftIcon, MapIcon, MedalIcon, PlaneIcon } from "./icons";



interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Day 1-20: Ideation and Planning",
    description:
      "This is the first step in the process. You will need to come up with an idea for your Startup product. This can be anything from a new app, to a new service, to a new website.",
  },
  {
    icon: <MapIcon />,
    title: "Day 20-30: Validation",
    description:
      "We will help you validate your idea by conducting market research, talking to potential customers, and testing your product with real users.",
  },
  {
    icon: <PlaneIcon />,
    title: "Day 30-89: Build",
    description:
      "Once your idea is validated, we will help you build your product. This includes designing the user interface, developing the code, and testing the product to make sure it works as intended.",
  },
  {
    icon: <GiftIcon />,
    title: "Day 90: Launch!",
    description:
      "Finally, we will help you launch your product to the world. This includes marketing your product, getting press coverage, and reaching out to potential customers.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center "
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Simple steps to get your Startup up and running
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
