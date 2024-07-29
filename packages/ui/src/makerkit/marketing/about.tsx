
import { Statistics } from "./statistics";

export const About = () => {
    console.log('About');
  return (
    <section
      id="about"
      className="container "
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={"/images/pilot.png"}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                Why {" "} did we {" "} create {" "}
                </span>
                this?
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                We appreciate your time and money. We know that you want to focus on your business and not on the boilerplate. We have built this boilerplate to help you focus on your business and not on the common situations that you will face.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};
