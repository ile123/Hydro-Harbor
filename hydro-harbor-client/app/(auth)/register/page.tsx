import Card from "@/components/card";
import RegisterFrom from "./_components/register-form";

export default function Register() {
  return (
    <>
      <Card className="w-80">
        <h1 className="text-black dark:text-white font-semibold text-center text-4xl mb-4">
          Register
        </h1>
        <RegisterFrom />
      </Card>
    </>
  );
}
