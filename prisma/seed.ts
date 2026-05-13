import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL not set");
const adapter = new PrismaPg(url);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  console.log("Seeding database...");

  // ─── Partner User ───
  const partnerPassword = await bcrypt.hash("partner123", 10);
  const partnerUser = await prisma.user.upsert({
    where: { email: "partner@qobots.com" },
    update: {},
    create: {
      email: "partner@qobots.com",
      password: partnerPassword,
      firstName: "Demo",
      lastName: "Partner",
      role: "PARTNER",
    },
  });

  const partnerProfile = await prisma.partnerProfile.upsert({
    where: { userId: partnerUser.id },
    update: {},
    create: {
      userId: partnerUser.id,
      companyName: "Qobots Demo Partner",
      verified: true,
      approved: true,
    },
  });

  console.log("Created partner user:", partnerUser.email);

  // ─── Customer User ───
  const customerPassword = await bcrypt.hash("customer123", 10);
  const customerUser = await prisma.user.upsert({
    where: { email: "customer@qobots.com" },
    update: {},
    create: {
      email: "customer@qobots.com",
      password: customerPassword,
      firstName: "Demo",
      lastName: "Customer",
      role: "CUSTOMER",
    },
  });

  console.log("Created customer user:", customerUser.email);

  // ─── Robots (from data.ts mock data) ───
  const robotsData = [
    {
      slug: "agibot-x2-ultra",
      name: "X2 Ultra",
      brand: "Agibot",
      sku: "AGB-X2U-2025",
      type: "Humanoid" as const,
      dof: 42,
      torque: 320,
      speed: 82,
      strength: 91,
      aiLevel: 88,
      rentalPrice: 899,
      buyPrice: 189000,
      description:
        "Flagship humanoid with 42 DOF and advanced manipulation. Ideal for warehouse and logistics operations.",
      status: "AVAILABLE" as const,
      published: true,
      available: true,
    },
    {
      slug: "unitree-h1",
      name: "H1 Pro",
      brand: "Unitree",
      sku: "UTR-H1P-2025",
      type: "Humanoid" as const,
      dof: 38,
      torque: 280,
      speed: 94,
      strength: 76,
      aiLevel: 82,
      rentalPrice: 749,
      buyPrice: 145000,
      description:
        "The fastest humanoid on the market. Built for speed-critical applications and dynamic environments.",
      status: "AVAILABLE" as const,
      published: true,
      available: true,
    },
    {
      slug: "delta-rx-500",
      name: "RX-500",
      brand: "Delta Robots",
      sku: "DLT-RX5-2025",
      type: "Industrial" as const,
      dof: 28,
      torque: 450,
      speed: 65,
      strength: 98,
      aiLevel: 71,
      rentalPrice: 599,
      buyPrice: 98000,
      description:
        "Industrial-grade strength with precision control. Designed for manufacturing and heavy assembly tasks.",
      status: "AVAILABLE" as const,
      published: true,
      available: false,
    },
    {
      slug: "booster-t3",
      name: "T3 Companion",
      brand: "Booster",
      sku: "BST-T3C-2025",
      type: "Reception" as const,
      dof: 24,
      torque: 120,
      speed: 55,
      strength: 35,
      aiLevel: 95,
      rentalPrice: 299,
      buyPrice: 45000,
      description:
        "AI-first reception robot with natural language mastery. Perfect for hospitality and customer service.",
      status: "AVAILABLE" as const,
      published: true,
      available: true,
    },
    {
      slug: "unitree-go2",
      name: "Go2 Pro",
      brand: "Unitree",
      sku: "UTR-G2P-2025",
      type: "Quadruped" as const,
      dof: 12,
      torque: 180,
      speed: 88,
      strength: 62,
      aiLevel: 78,
      rentalPrice: 449,
      buyPrice: 68000,
      description:
        "Agile quadruped for terrain inspection, security patrols, and autonomous mapping in complex environments.",
      status: "AVAILABLE" as const,
      published: true,
      available: true,
    },
    {
      slug: "magic-lab-pm01",
      name: "PM-01",
      brand: "Magic Lab",
      sku: "MGL-PM1-2025",
      type: "Humanoid" as const,
      dof: 36,
      torque: 260,
      speed: 72,
      strength: 84,
      aiLevel: 86,
      rentalPrice: 679,
      buyPrice: 125000,
      description:
        "Balanced humanoid with exceptional dexterity. Excels at fine motor tasks and collaborative work.",
      status: "AVAILABLE" as const,
      published: true,
      available: true,
    },
  ];

  const createdRobots = [];
  for (const data of robotsData) {
    const robot = await prisma.robot.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        partnerId: partnerProfile.id,
      },
    });
    createdRobots.push(robot);
  }

  console.log(`Created ${createdRobots.length} robots`);

  // ─── Robot Images ───
  const robotImages: Record<string, string> = {
    "agibot-x2-ultra": "/robot-x2-ultra.jpeg",
    "unitree-h1": "/robot-h1-pro.jpeg",
    "booster-t3": "/robot-t3-companion.jpeg",
    "delta-rx-500": "/robot-rx500.jpeg",
    "unitree-go2": "/robot-go2-pro.jpeg",
    "magic-lab-pm01": "/robot-pm01.jpeg",
  };

  for (const robot of createdRobots) {
    const imageUrl = robotImages[robot.slug];
    if (imageUrl) {
      const existingImage = await prisma.robotImage.findFirst({
        where: { robotId: robot.id },
      });
      if (!existingImage) {
        await prisma.robotImage.create({
          data: {
            robotId: robot.id,
            url: imageUrl,
            alt: robot.name,
            sortOrder: 0,
          },
        });
      }
    }
  }

  console.log("Created robot images");

  // ─── Skills (from data.ts mock data) ───
  const skillsData = [
    {
      slug: "nav-slam",
      name: "SLAM Navigation",
      icon: "M",
      author: "Dexio Labs",
      version: "3.2",
      description:
        "Real-time simultaneous localization and mapping for autonomous indoor navigation.",
      category: "Navigation" as const,
      compatibility: ["Universal"],
      price: 49,
      rating: 4.8,
      installs: 3420,
    },
    {
      slug: "vis-object-detect",
      name: "Object Detection Pro",
      icon: "O",
      author: "VisionAI",
      version: "2.1",
      description:
        "Multi-class object detection with 98.2% accuracy. Supports 1200+ object categories.",
      category: "Vision" as const,
      compatibility: ["Universal"],
      price: 79,
      rating: 4.9,
      installs: 5100,
    },
    {
      slug: "lang-natural-pl",
      name: "Natural Language PL",
      icon: "L",
      author: "LinguaTech",
      version: "4.0",
      description:
        "Full Polish language understanding with context-aware dialogue management.",
      category: "Language" as const,
      compatibility: ["Universal"],
      price: 29,
      rating: 4.5,
      installs: 1890,
    },
    {
      slug: "ind-welding",
      name: "Precision Welding",
      icon: "W",
      author: "IndustrialAI",
      version: "1.8",
      description:
        "Automated MIG/TIG welding with real-time seam tracking and quality inspection.",
      category: "Industrial" as const,
      compatibility: ["Delta Robots", "Agibot"],
      price: 149,
      rating: 4.7,
      installs: 890,
    },
    {
      slug: "nav-outdoor",
      name: "Outdoor Terrain",
      icon: "T",
      author: "PathFinder",
      version: "2.3",
      description:
        "GPS-aided outdoor navigation with terrain classification and obstacle avoidance.",
      category: "Navigation" as const,
      compatibility: ["Unitree", "Agibot"],
      price: 39,
      rating: 4.3,
      installs: 2100,
    },
    {
      slug: "vis-face-recog",
      name: "Face Recognition",
      icon: "F",
      author: "Dexio Labs",
      version: "3.0",
      description:
        "Privacy-compliant face detection and recognition with liveness checks.",
      category: "Vision" as const,
      compatibility: ["Universal"],
      price: 59,
      rating: 4.6,
      installs: 4200,
    },
    {
      slug: "lang-en-pro",
      name: "English Pro",
      icon: "E",
      author: "Dexio Labs",
      version: "5.1",
      description:
        "Advanced English NLU with sentiment analysis, intent recognition, and multi-turn dialogue.",
      category: "Language" as const,
      compatibility: ["Universal"],
      price: 0,
      rating: 4.8,
      installs: 8900,
    },
    {
      slug: "custom-brand-host",
      name: "Brand Host",
      icon: "B",
      author: "Dexio Labs",
      version: "2.0",
      description:
        "White-label hosting personality. Custom greetings, brand voice, and event scripting.",
      category: "Custom" as const,
      compatibility: ["Universal"],
      price: 49,
      rating: 4.4,
      installs: 3100,
    },
    {
      slug: "ind-pick-place",
      name: "Pick & Place",
      icon: "P",
      author: "RoboLogic",
      version: "3.1",
      description:
        "High-speed pick and place with adaptive grip force and conveyor synchronization.",
      category: "Industrial" as const,
      compatibility: ["Agibot", "Delta Robots", "Magic Lab"],
      price: 89,
      rating: 4.7,
      installs: 2800,
    },
    {
      slug: "vis-quality",
      name: "Quality Inspector",
      icon: "Q",
      author: "IndustrialAI",
      version: "1.5",
      description:
        "Visual quality inspection with defect classification. Sub-millimeter accuracy.",
      category: "Vision" as const,
      compatibility: ["Delta Robots", "Agibot"],
      price: 119,
      rating: 4.5,
      installs: 1200,
      premium: true,
    },
    {
      slug: "nav-elevator",
      name: "Elevator Control",
      icon: "V",
      author: "BuildingAI",
      version: "1.2",
      description:
        "Autonomous elevator interaction — call, enter, select floor, and exit safely.",
      category: "Navigation" as const,
      compatibility: ["Universal"],
      price: 19,
      rating: 4.1,
      installs: 980,
    },
    {
      slug: "custom-dance",
      name: "Dance Routines",
      icon: "D",
      author: "MotionCraft",
      version: "1.0",
      description:
        "Pre-choreographed dance routines for events and exhibitions. 12 styles included.",
      category: "Custom" as const,
      compatibility: ["Unitree", "Agibot", "Booster"],
      price: 0,
      rating: 4.0,
      installs: 6500,
    },
  ];

  const createdSkills = [];
  for (const data of skillsData) {
    const skill = await prisma.skill.upsert({
      where: { slug: data.slug },
      update: {},
      create: data,
    });
    createdSkills.push(skill);
  }

  console.log(`Created ${createdSkills.length} skills`);

  // ─── Sample Orders ───
  const robot1 = createdRobots[0]; // X2 Ultra
  const robot2 = createdRobots[1]; // H1 Pro
  const robot3 = createdRobots[3]; // T3 Companion

  const existingOrders = await prisma.order.count({
    where: { customerId: customerUser.id },
  });

  if (existingOrders === 0) {
    await prisma.order.create({
      data: {
        orderNumber: "QBT-10001",
        customerId: customerUser.id,
        robotId: robot1.id,
        type: "RENT",
        days: 30,
        startDate: new Date("2026-03-01"),
        endDate: new Date("2026-03-31"),
        amount: robot1.rentalPrice,
        status: "ACTIVE",
        shippingFirstName: "Demo",
        shippingLastName: "Customer",
        shippingEmail: "customer@qobots.com",
        shippingCity: "Warsaw",
        shippingCountry: "Poland",
      },
    });

    await prisma.order.create({
      data: {
        orderNumber: "QBT-10002",
        customerId: customerUser.id,
        robotId: robot2.id,
        type: "BUY",
        amount: robot2.buyPrice,
        status: "SHIPPED",
        shippingFirstName: "Demo",
        shippingLastName: "Customer",
        shippingEmail: "customer@qobots.com",
        shippingCity: "Krakow",
        shippingCountry: "Poland",
      },
    });

    await prisma.order.create({
      data: {
        orderNumber: "QBT-10003",
        customerId: customerUser.id,
        robotId: robot3.id,
        type: "SUBSCRIBE",
        plan: "MONTHLY",
        amount: robot3.rentalPrice,
        recurring: true,
        status: "PENDING",
        shippingFirstName: "Demo",
        shippingLastName: "Customer",
        shippingEmail: "customer@qobots.com",
        shippingCity: "Gdansk",
        shippingCountry: "Poland",
      },
    });

    console.log("Created 3 sample orders");
  } else {
    console.log("Orders already exist, skipping");
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
