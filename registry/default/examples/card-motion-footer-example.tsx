import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "registry/default/ui/card";
import { Button } from "registry/default/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Input } from "registry/default/ui/input";
export function CardMotionFooterExample() {
  const [name, setName] = useState("Alex Doe");
  const [originalName] = useState("Alex Doe");
  const hasChanges = name !== originalName;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardBody className="grid gap-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <Input id="name" onChange={(e) => setName(e.target.value)} value={name} />
        </div>
      </CardBody>
      <AnimatePresence>
        {hasChanges && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="grid min-h-0 overflow-hidden"
            exit={{ height: "0px", opacity: 0 }}
            initial={{ height: "0px", opacity: 0 }}
            key="save-button"
            transition={{
              duration: 0.3,
              ease: [0.79, 0.14, 0.15, 0.86],
            }}
          >
            <CardFooter>
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                  exit={{ filter: "blur(6px)", opacity: 0, scale: 0.95 }}
                  initial={{ filter: "blur(6px)", opacity: 0, scale: 0.95 }}
                  key="reset-button"
                  transition={{
                    duration: 0.3,
                    ease: [0.79, 0.14, 0.15, 0.86],
                  }}
                >
                  <Button onClick={() => setName(originalName)} type="button" variant="ghost">
                    Reset
                  </Button>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait">
                <motion.div
                  animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                  exit={{ filter: "blur(6px)", opacity: 0, scale: 0.95 }}
                  initial={{ filter: "blur(6px)", opacity: 0, scale: 0.95 }}
                  key="save-button"
                  transition={{
                    duration: 0.3,
                    ease: [0.79, 0.14, 0.15, 0.86],
                  }}
                >
                  <Button type="submit">Save Changes</Button>
                </motion.div>
              </AnimatePresence>
            </CardFooter>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
