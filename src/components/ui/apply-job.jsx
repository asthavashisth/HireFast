/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useFetch from "@/hooks/use-fetch";
import { applyToJob } from "@/api/apiApplications";
import { BarLoader } from "react-spinners";



const schema = z.object({
  experience: z
    .number()
    .min(0, { message: "Experience must be at least 0" })
    .int(),
  skills: z.string().min(1, { message: "Skills are required" }),
  education: z.enum(["Intermediate", "Graduate", "Post Graduate"], {
    message: "Education is required",
  }),
  resume: z
    .any()
    .refine(
      (file) =>
        file[0] &&
        (file[0].type === "application/pdf" ||
          file[0].type === "application/msword"),
      { message: "Only PDF or Word documents are allowed" }
    ),
});

export function ApplyJobDrawer({ user, job, fetchJob, applied = false }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingApply,
    error: errorApply,
    fn: fnApply,
  } = useFetch(applyToJob);

  // const onSubmit = (data) => {
  //   fnApply({
  //     ...data,
  //     job_id: job.id,
  //     candidate_id: user.id,
  //     name: user.fullName,
  //     status: "applied",
  //     resume: data.resume[0],
  //   }).then(() => {
  //     fetchJob();
  //     reset();
  //   })
  //   .catch((error) => {
  //     console.error(error); // Log any errors from the API
  //   });
  // };

  const onSubmit = (data) => {
    fnApply({
      ...data,
      job_id: job.id,
      candidate_id: user.id,
      name: user.fullName,
      status: "applied",
      resume: data.resume[0],
    }).then(() => {
      console.log("Application successful");
      fetchJob()
        .then((updatedJob) => {
          console.log("Job data after applying:", updatedJob);
          reset();
        })
        .catch((error) => console.error("Error fetching job:", error));
    });
  };
  
  

  return (
    <Drawer open={applied ? false : undefined}>
      <DrawerTrigger asChild>
        <Button
          size="lg"
          variant={job?.isOpen && !applied ? "blue" : "destructive"}
          disabled={!job?.isOpen || applied}
        >
          {job?.isOpen ? (applied ? "Applied" : "Apply") : "Hiring Closed"}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-white">
            Apply for {job?.title} at {job?.company?.name}
          </DrawerTitle>
          <DrawerDescription className="text-white">Please Fill the form below</DrawerDescription>
        </DrawerHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 pb-0 text-white"
        >
          <Input
            type="number"
            placeholder="Years of Experience"
            className="flex-1 text-black"
            {...register("experience", {
              valueAsNumber: true,
            })}
          />
          {errors.experience && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md">
              <p className="text-sm">{errors.experience.message}</p>
              </div>
          )}
          <Input
            type="text"
            placeholder="Skills (Comma Separated)"
            className="flex-1 text-black"
            {...register("skills")}
          />
          {errors.skills && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md">
              <p className="text-sm">{errors.skills.message}</p>
              </div>
          )}
          <Controller
            name="education"
            control={control}
            render={({ field }) => (
              <RadioGroup onValueChange={field.onChange} {...field}>
                <div className="flex items-center space-x-2 text-white">
                  <RadioGroupItem value="Intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">Intermediate</Label>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <RadioGroupItem value="Graduate" id="graduate" />
                  <Label htmlFor="graduate">Graduate</Label>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <RadioGroupItem value="Post Graduate" id="post-graduate" />
                  <Label htmlFor="post-graduate">Post Graduate</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.education && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md">
              <p className="text-sm">{errors.education.message}</p>
              </div>
          )}
          <Input
            type="file"
            accept=".pdf, .doc, .docx"
            className="flex-1 file:text-gray-500 text-white"
            {...register("resume")}
          />
          {errors.resume && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md">
            <p className="text-sm">{errors.resume.message}</p>
            </div>
          )}
          {errorApply?.message && (
            <div className="bg-red-100 border border-red-500 text-red-700 px-4 py-2 rounded-md">
            <p className="text-sm">{errorApply?.message}</p>
            </div>
          )}
          {loadingApply && <BarLoader width={"100%"} color="#36d7b7" />}
          <Button type="submit" variant="blue" size="lg" className="text-white"> 
            Apply
          </Button>
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="text-white">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

);
}
  export default ApplyJobDrawer;

  
