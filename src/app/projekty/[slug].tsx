import { useRouter } from "next/router";

export default function Projekt() {

   const router = useRouter();

   return (
      <div>
           { router.query.slug }
      </div>
   );
}