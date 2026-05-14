import RobotForm from "../robot-form";

export default function NewRobotPage() {
  return (
    <RobotForm
      mode="new"
      initial={{
        slug: "",
        name: "",
        brand: "",
        category: "HUMANOID",
        status: "PRODUCTION",
        published: true,
        sortOrder: 0,
        tagline: "",
        description: "",
        specs: [],
        features: [],
        images: [],
      }}
    />
  );
}
