import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const adapter = new PrismaPg(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@qobots.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
if (!ADMIN_PASSWORD) {
  console.error("ADMIN_PASSWORD env var is required. Example: ADMIN_PASSWORD=secret123 npm run seed");
  process.exit(1);
}

const ROBOTS = [
  {
    slug: "agibot-a2",
    name: "AgiBot A2 Series",
    brand: "AgiBot",
    category: "HUMANOID",
    tagline: "43 DOF. Full-size. Production-ready.",
    description: "Full-size humanoid built for demanding commercial environments. Combines advanced biomechanics with powerful AI modules. Available in Ultra and Lite configurations.",
    status: "PRODUCTION",
    sortOrder: 0,
    specs: [
      { label: "DOF", value: "42" },
      { label: "Type", value: "Full-size humanoid" },
      { label: "Versions", value: "Ultra / Lite" },
      { label: "AI", value: "AI Assistant" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Interaction", value: "Voice + Touch" },
    ],
    features: ["Voice + Touch interaction", "Autonomous navigation", "42 DOF", "Ultra / Lite versions", "AI Assistant"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/16_2e2ea8f2-9fb0-47c9-a696-ab86615adbc6.png?v=1770653836&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/17_d20f8158-df13-4845-92e7-c46b7f093696.png?v=1770653866&width=900",
    ],
  },
  {
    slug: "agibot-x2",
    name: "AgiBot X2 Series",
    brand: "AgiBot",
    category: "HUMANOID",
    tagline: "25–30 DOF. Agile. Event-ready.",
    description: "Half-sized humanoid with 25–30 DOF. Natural movement, voice interaction and autonomous navigation — ready to work from day one. Our most deployed platform.",
    status: "PRODUCTION",
    sortOrder: 1,
    specs: [
      { label: "DOF", value: "25–30" },
      { label: "Type", value: "Compact humanoid" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Interaction", value: "Voice + Face recognition" },
      { label: "Display", value: "LED Face" },
      { label: "Gestures", value: "Gesture control" },
    ],
    features: ["Voice interaction", "Autonomous navigation", "Face recognition", "Gesture control", "LED Face"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/21.png?v=1770654011&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/22.png?v=1770654030&width=900",
    ],
  },
  {
    slug: "agibot-g2",
    name: "AgiBot G2",
    brand: "AgiBot",
    category: "INDUSTRIAL",
    tagline: "WorkGPT AI. 350 N·m. Factory-grade.",
    description: "Advanced industrial robot with precision force manipulation and WorkGPT AI. Designed for factory environments and complex manual tasks requiring high torque and repeatability.",
    status: "LAB",
    sortOrder: 2,
    specs: [
      { label: "DOF", value: "7+7 arms" },
      { label: "Torque", value: "350 N·m" },
      { label: "AI", value: "WorkGPT" },
      { label: "Type", value: "Industrial manipulator" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Grippers", value: "Precision end-effectors" },
    ],
    features: ["WorkGPT AI", "350 N·m force manipulation", "Precision grippers", "Autonomous navigation"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/18.png?v=1770654116&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/19.png?v=1770654121&width=900",
    ],
  },
  {
    slug: "delta-dog-l3",
    name: "Delta Dog L3",
    brand: "Delta Robots",
    category: "QUADRUPED",
    tagline: "Any terrain. Stairs. 3.5 m/s.",
    description: "Athletic quadruped robot with autonomous navigation. Handles any terrain, climbs stairs — ideal for inspections, events, and environments where wheeled robots fail.",
    status: "PRODUCTION",
    sortOrder: 3,
    specs: [
      { label: "DOF", value: "12" },
      { label: "Speed", value: "3.5 m/s" },
      { label: "Payload", value: "10 kg" },
      { label: "Navigation", value: "SLAM + LiDAR" },
      { label: "Terrain", value: "Off-road + stairs" },
      { label: "Type", value: "Quadruped" },
    ],
    features: ["3.5 m/s max speed", "Off-road capable", "SLAM + LiDAR", "10 kg payload", "Stair climbing"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_13.png?v=1761819504&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_14.png?v=1761819504&width=900",
    ],
  },
  {
    slug: "greetingbot-nova",
    name: "GreetingBot Nova",
    brand: "Delta Robots",
    category: "RECEPTION",
    tagline: "20+ languages. Hotels. Offices.",
    description: "Compact reception robot with natural dialogue and autonomous navigation. Perfect for hotels, offices and shopping centres. 8h+ battery, LED face, multilingual.",
    status: "PRODUCTION",
    sortOrder: 4,
    specs: [
      { label: "Languages", value: "20+" },
      { label: "Battery", value: "8h+" },
      { label: "Navigation", value: "Autonomous" },
      { label: "Display", value: "LED Face" },
      { label: "Interaction", value: "Voice + Touch" },
      { label: "Type", value: "Service / Reception" },
    ],
    features: ["Voice + Touch dialogue", "Autonomous navigation", "LED Face", "20+ languages", "8h+ battery"],
    images: [
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_17.png?v=1761909351&width=900",
      "https://shop.deltarobots.com/cdn/shop/files/robotyshopify_16.png?v=1761909354&width=900",
    ],
  },
];

async function main() {
  // Admin user
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL.toLowerCase() },
    update: { role: "ADMIN" },
    create: {
      email: ADMIN_EMAIL.toLowerCase(),
      password: passwordHash,
      firstName: "Admin",
      lastName: "Qobots",
      role: "ADMIN",
    },
  });
  console.log(`✓ Admin user: ${admin.email}`);

  // Robots
  for (const r of ROBOTS) {
    await prisma.robot.upsert({
      where: { slug: r.slug },
      update: {
        name: r.name,
        brand: r.brand,
        category: r.category,
        tagline: r.tagline,
        description: r.description,
        status: r.status,
        sortOrder: r.sortOrder,
        specs: r.specs,
        features: r.features,
        published: true,
      },
      create: {
        slug: r.slug,
        name: r.name,
        brand: r.brand,
        category: r.category,
        tagline: r.tagline,
        description: r.description,
        status: r.status,
        sortOrder: r.sortOrder,
        specs: r.specs,
        features: r.features,
        published: true,
        images: {
          create: r.images.map((url, idx) => ({ url, alt: r.name, sortOrder: idx })),
        },
      },
    });
    console.log(`✓ Robot: ${r.name}`);
  }

  console.log("\nDone.");
  console.log(`Login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
