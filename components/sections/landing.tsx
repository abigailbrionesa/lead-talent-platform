"use client";
import { motion } from "framer-motion";
import SignIn from "../ui/sign-in";
import { Sign } from "crypto";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import type { User as UserType } from "@prisma/client";


export const LandingSection = ({ user }: { user: UserType |  undefined }) => {
  const title = "LEAD Talent Platform";
  const words = title.split(" ");
  return (
    <div className=" min-h-screen  flex items-center justify-center  bg-background">
      <div className="mx-auto px-4 md:px-6 ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-primary to-blue-900 
                                        dark:from-white dark:to-orange-100/50"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
       
        </motion.div>


           <p className="text-2xl max-w-lg mx-auto text-center">
            Conectamos el talento universitario LEAD con las mejores
            oportunidades profesionales.
          </p>


          <Card className="w-[350px] mx-auto mt-10">
            <CardHeader>
              <CardTitle>Crea tu perfil ahora</CardTitle>
              <CardDescription>
                ¿Eres estudiante o reclutador? ¿Quieres unirte a LEAD y conectar
                con talento?
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <SignIn />
            </CardFooter>
          </Card>

                    <Card className="w-[350px] mx-auto mt-10">
            <CardHeader>
              <CardTitle>Bienvenido, </CardTitle>
              <CardDescription>
                Eres parte de LEAD como Miembro. Tu perfil ahora está en la base de datos
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
                  <Button  size="sm" variant="outline">
      Ver perfil
    </Button>
            </CardFooter>
          </Card>

                    <Card className="w-[350px] mx-auto mt-10">
            <CardHeader>
              <CardTitle>Bienvenido, </CardTitle>
              <CardDescription>
                Encuentra talento en la comunidad LEAD
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button  size="sm" variant="outline">
      Ver base de datos
    </Button>
            </CardFooter>
          </Card>

      </div>

      
    </div>
  );
}
