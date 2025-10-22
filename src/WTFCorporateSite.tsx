import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Leaf, ShieldCheck, Factory, Truck, Sprout, Mail, MapPin, Phone, CheckCircle2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppleQualityInteractive from "@/components/AppleQualityInteractive";

/**
 * What The Fruit – Corporate Site (single-file)
 * - Sticky glass navbar with section scroll
 * - Hero with parallax + gradient overlay
 * - Mission/About, Sourcing, Quality, ESG, Guarantee
 * - Certifications & partners band
 * - Careers CTA & Contact section
 * - Responsive + Accessible + Keyboard-friendly
 *
 * Assets expected in the same public folder:
 *  - logo.png
 *  - applebackground-min.jpg
 *  - moneyback.jpg
 */

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "sourcing", label: "Sourcing" },
  { id: "quality", label: "Quality" },
  { id: "esg", label: "ESG" },
  { id: "guarantee", label: "Guarantee" },
  { id: "contact", label: "Contact" },
];

const Section: React.FC<{ id: string; className?: string; children: React.ReactNode; ariaLabel?: string }> = ({ id, className, children, ariaLabel }) => (
  <section id={id} aria-label={ariaLabel ?? id} className={`scroll-mt-28 snap-start w-full ${className ?? ""}`}>{children}</section>
);

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

const Pill: React.FC<{children: React.ReactNode}> = ({children}) => (
  <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide text-emerald-900 border-emerald-900/30 bg-emerald-50">
    {children}
  </span>
);

const Stat: React.FC<{value: string; label: string}> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl md:text-4xl font-extrabold text-emerald-900">{value}</div>
    <div className="text-xs uppercase tracking-widest text-emerald-900/70">{label}</div>
  </div>
);

export default function WTFCorporateSite() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.85]);
  const active = useActiveSection(NAV.map(n=>n.id));

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset to align section start with the red line/visual break
      // Header height + space to position content properly after visual separators
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 100;
      
      // Additional offset to align with your red line design element
      const designOffset = 80; // Adjust this value to align with your red line
      const totalOffset = headerHeight + designOffset;
      
      const elementPosition = element.offsetTop - totalOffset;
      
      window.scrollTo({
        top: Math.max(0, elementPosition), // Ensure we don't scroll past the top
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen w-full text-emerald-50 bg-white scroll-smooth snap-y snap-mandatory overflow-y-scroll h-screen">
      {/* NAVBAR */}
      <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* relative + overflow-visible lets the logo float outside the bar */}
        <div className="relative overflow-visible mt-3 flex items-center justify-between rounded-2xl bg-emerald-900/90 backdrop-blur supports-[backdrop-filter]:bg-emerald-900/60 px-2 sm:px-4 py-2 shadow-lg ring-1 ring-white/10">
          
          {/* FLOATING LOGO (absolute) */}
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="What The Fruit"
            className="absolute left-2 md:left-3 -top-5 md:-top-6 h-20 md:h-24 w-auto rounded-sm drop-shadow-xl pointer-events-none select-none"
          />

          {/* pad left so content doesn't collide with logo */}
          <div className="flex items-center gap-3 pl-24 md:pl-28">
            <div className="hidden sm:block">
              <Pill>
                <Leaf className="h-4 w-4" /> Outrageously delicious
              </Pill>
            </div>
          </div>

          {/* NAV: force readable states (no white-on-white on hover/focus/selection) */}
          <nav aria-label="Primary" className="hidden md:flex items-center gap-2">
            {NAV.map((n) => (
              <Button
                key={n.id}
                variant="ghost"
                onClick={() => scrollTo(n.id)}
                className={[
                  active === n.id
                    ? "bg-white text-emerald-900 hover:bg-white" // active: dark text
                    : "text-white hover:bg-emerald-800 hover:text-white", // inactive: darken bg slightly, keep text white
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                ].join(" ")}
              >
                {n.label}
              </Button>

            ))}
          </nav>

          {/* mobile CTA */}
          <div className="flex md:hidden">
            <Button
              variant="secondary"
              onClick={() => scrollTo('contact')}
              className="text-emerald-900"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </header>



      {/* HERO */}
      <Section id="home" ariaLabel="Home / Hero" className="relative isolate">
        <motion.div style={{ y, opacity }}
          className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('applebackground-min.jpg')] bg-cover bg-center" aria-hidden/>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-emerald-900/60 to-white" aria-hidden/>
        </motion.div>

        <div className="pt-28 pb-20 sm:pt-36 sm:pb-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <Pill>
                <ShieldCheck className="h-4 w-4"/> 100% Money‑Back Guarantee
              </Pill>
              <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
                Not all fruits are created equal.
              </h1>
              <p className="mt-5 text-lg sm:text-xl text-emerald-50/90 max-w-xl">
                We partner with select farms and run a cold‑chain built for flavour—so the last bite tastes as good as the first.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button onClick={()=>scrollTo("about")} className="bg-white text-emerald-900 hover:bg-emerald-50">Learn more</Button>
                <Button variant="outline" onClick={()=>scrollTo("contact")} className="backdrop-blur bg-white/10 border-white/40 text-white hover:bg-white/20">
                  Get in touch <ArrowUpRight className="ml-1 h-4 w-4"/>
                </Button>
              </div>
            </div>

            {/* quick stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl">
              <Stat value="500+" label="Retailers in Mumbai"/>
              <Stat value="12+" label="Partner farms"/>
          
            </div>
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" className="bg-white text-emerald-900">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">What’s in a name?</h2>
              <p className="mt-4 italic text-emerald-900/90">The poet said  ".. that which we call an apple by any other name would taste as sweet…”</p>
              <p className="mt-6 text-lg leading-8">
                <span className="font-semibold italic">But, do they?</span> Fruits that are wrongly harvested, stored, transported and exposed to the harsh elements during their journey from farm to your table won’t taste good.
                <br/><br/>
                <span className="font-bold italic">‘What The Fruit’ apples</span> come from select farms who are known for producing quality fruit and are transported and stored with great care to preserve the bite, crunch and aroma.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Pill><Factory className="h-4 w-4"/> Controlled sourcing</Pill>
                <Pill><Truck className="h-4 w-4"/> Quick to Market</Pill>
                <Pill><Sprout className="h-4 w-4"/> Farm partnerships</Pill>
              </div>
            </div>
            <Card className="border-emerald-900/20 shadow-sm">
              <CardHeader>
                <CardTitle className="text-emerald-900">Our Operating Principles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-emerald-900/90">
                {[
                  "Nurture the farmers who nurture the fruits.",
                  "Harvest at peak maturity—never early for logistics.",
                  "Dedicated long-haul transport to market.",
                  "Batch‑level traceability and QC at every hop.",
                  
                ].map((t, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5"/>
                    <span>{t}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Segment 2: Packaging Solution */}
        <div className="mx-auto max-w-7xl px-6 mt-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">Our Patented Zero Plastic Packaging Solution</h2>
          <video
            src="Animation.mp4"
            autoPlay
            loop
            muted
            controls
            className="rounded-xl shadow-lg max-w-full h-auto"
            style={{ maxWidth: '640px' }}
            poster="applebackground-min.jpg"
          >
            Sorry, your browser does not support embedded videos.
          </video>
        </div>
      </Section>

      {/* SOURCING */}
      <Section id="sourcing" className="bg-emerald-50 text-emerald-900">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Kinnaur Apple Growers</h2>
            <p className="text-lg text-emerald-700 max-w-3xl mx-auto">
              High in the mountains of Kinnaur, Himachal Pradesh, our partner farmers cultivate apples with a distinctive crunch. 
              The high altitude (8,000-12,000 feet) and unique climate create the perfect conditions for apples with exceptional 
              texture, sweetness, and that signature crisp bite that sets Kinnaur apples apart.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
            {[{
              name: "Sachin Bhandari",
              location: "Kalpa, Kinnaur",
              story: "Growing apples for over 20 years, specializing in Red Delicious varieties that develop their signature crunch from the mountain air.",
              image: "farmer1.jpg"
            },{
              name: "Alka Negi", 
              location: "Reckong Peo, Kinnaur",
              story: "Third-generation apple farmer whose orchards at 10,000 feet produce some of the crispiest Royal Delicious apples in the region.",
              image: "farmer2.jpg"
            },{
              name: "Sunil",
              location: "Sangla Valley, Kinnaur", 
              story: "Pioneer in sustainable farming practices, growing Golden Delicious apples that retain their crunch for months thanks to the cold mountain climate.",
              image: "farmer3.jpg"
            },{
              name: "Chander Shekhar Negi",
              location: "Pooh, Kinnaur",
              story: "High-altitude farming specialist whose orchards produce exceptionally sweet apples with the perfect balance of crunch and juice.",
              image: "farmer4.jpg"
            },{
              name: "Gian Negi",
              location: "Nako, Kinnaur",
              story: "Master of traditional pruning techniques, growing heritage apple varieties that have adapted to the harsh mountain conditions over decades.",
              image: "farmer5.jpg"
            }].map((farmer, i)=>(
              <Card key={i} className="border-emerald-900/20 overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src={farmer.image} 
                    alt={farmer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-emerald-900">{farmer.name}</CardTitle>
                  <p className="text-sm text-emerald-600 font-medium">{farmer.location}</p>
                </CardHeader>
                <CardContent className="text-emerald-900/90">
                  {farmer.story}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8">From Orchard to Harvest</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-emerald-200">
                <div className="aspect-[3/4] relative bg-emerald-100 flex items-center justify-center">
                  <video
                    src="orchard-video1.mp4"
                    controls
                    className="w-full h-full object-cover"
                    poster="videoposter1.png"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-emerald-900 mb-2">Fruits Ready for Picking</h4>
                  <p className="text-sm text-emerald-700">
                    Watch as our farmers carefully select the ripest apples, ensuring each one meets our quality standards for that perfect Kinnaur crunch.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-emerald-200">
                <div className="aspect-[3/4] relative bg-emerald-100 flex items-center justify-center">
                  <video
                    src="orchard-video2.mp4"
                    controls
                    className="w-full h-full object-cover"
                    poster="videoposter2.png"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-emerald-900 mb-2">High-Altitude Orchards</h4>
                  <p className="text-sm text-emerald-700">
                    Experience the breathtaking mountain orchards where altitude and climate combine to create apples with unmatched flavor and texture.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 border border-emerald-200">
            <div className="flex items-start gap-4">
              <Sprout className="h-8 w-8 text-emerald-600 mt-1"/>
              <div>
                <h3 className="text-xl font-semibold mb-3">The Kinnaur Advantage</h3>
                <p className="text-emerald-800 leading-relaxed">
                  The extreme altitude and temperature variations in Kinnaur create natural stress conditions that make apples develop 
                  thicker cell walls and higher sugar content. The result? That distinctive crunch and intense flavor that makes 
                  Kinnaur apples coveted across India. Our farmers have perfected cultivation techniques passed down through generations, 
                  combined with modern sustainable practices to ensure every apple meets our exacting standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* QUALITY */}
      <Section id="quality" className="bg-white text-emerald-900">
        {/* Segment 1: Physical and Sensory Inspections */}
        <div className="mb-12">
          <AppleQualityInteractive
            src={`${import.meta.env.BASE_URL}apple.png`} 
            title="6 different physical and sensory inspections"
          />
        </div>
        
      </Section>



      {/* ESG */}
      <Section id="esg" className="bg-emerald-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: "Food waste ↓",
              body: "First‑expiry‑first‑out operations and rescue‑grade rerouting minimise waste across the chain.",
            },{
              title: "Farmer success",
              body: "Transparent grade‑linked pricing and agronomy support for higher, more stable incomes.",
            },{
              title: "Packaging rethink",
              body: "Optimised packs and recycled substrates where possible—without compromising protection.",
            }].map((e,i)=>(
              <Card key={i} className="bg-white/5 border-white/10 text-white">
                <CardHeader>
                  <CardTitle>{e.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-white/90">{e.body}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* GUARANTEE */}
      <Section id="guarantee" className="bg-emerald-50 text-emerald-900">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid md:grid-cols-[160px_1fr] items-center gap-8">
            <img src="moneyback.jpg" alt="100% Money Back Guarantee" className="h-40 w-40 object-contain rounded-xl ring-1 ring-emerald-900/10 bg-white"/>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold">Risk‑free promise</h2>
              <p className="mt-4 text-lg leading-8">
                Talk is cheap. We back our claims with refunds—no forms, no fuss. If it’s not outrageously delicious, we’ll make it right.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="bg-white text-emerald-900">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl font-extrabold">Contact us</h2>
              <p className="mt-4 text-lg">We’d love to talk sourcing, partnerships or distribution.</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-6">
                <Card className="border-emerald-900/20">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5"/> Email</CardTitle></CardHeader>
                  <CardContent>
                    <a href="mailto:hello@whatthefruit.com" className="underline decoration-emerald-300 hover:text-emerald-700">hello@whatthefruit.com</a>
                  </CardContent>
                </Card>
                <Card className="border-emerald-900/20">
                  <CardHeader><CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5"/> Phone</CardTitle></CardHeader>
                  <CardContent>+91‑88284‑08898</CardContent>
                </Card>
                <Card className="sm:col-span-2 border-emerald-900/20">
                  <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5"/> Registered Office</CardTitle></CardHeader>
                  <CardContent>
                    Growerscrate Agrotech Private Ltd<br/>
                    Gala no.107, Bldg no. 3, Jay Vijay Industrial Estate, Vasai Road (E), Vasai, Thane – 401202, Maharashtra
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-emerald-900/20">
              <CardHeader>
                <CardTitle>Partner with us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-emerald-900/90">
                <p>Retailer or grower? Share a few details and we’ll reach out.</p>
                <form onSubmit={(e)=>{e.preventDefault(); alert("Thanks! We’ll be in touch.");}} className="space-y-3">
                  <input required name="name" placeholder="Your name" className="w-full rounded-xl border border-emerald-900/30 px-3 py-2"/>
                  <input required type="email" name="email" placeholder="Email" className="w-full rounded-xl border border-emerald-900/30 px-3 py-2"/>
                  <select name="type" className="w-full rounded-xl border border-emerald-900/30 px-3 py-2">
                    <option>Retailer</option>
                    <option>Grower</option>
                    <option>Logistics partner</option>
                  </select>
                  <textarea name="msg" rows={4} placeholder="Tell us a bit…" className="w-full rounded-xl border border-emerald-900/30 px-3 py-2"/>
                  <Button type="submit" className="w-full bg-emerald-900 hover:bg-emerald-800">Send</Button>
                </form>
                <a href="https://wtfruit.in" className="inline-flex items-center gap-1 text-emerald-700 underline decoration-emerald-300"><ExternalLink className="h-4 w-4"/> wtfruit.in</a>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-900/10 bg-emerald-900 text-white">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="What The Fruit" className="h-8"/>
            <span className="text-sm tracking-wider">© {new Date().getFullYear()} Growerscrate Agrotech Pvt. Ltd</span>
          </div>
          <div className="text-xs opacity-80">Outrageously Delicious. If it’s not great, we’ll make it right.</div>
          <button onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="text-xs underline">Back to top</button>
        </div>
      </footer>
    </div>
  );
}