export function getTagStyle(tag: any) {
  switch (tag) {
    case "Design":
      return "mx-2 p-1 text-[#454360] bg-orange-300 transition-shadow duration-300 hover:shadow-[2px_2px_0px_1px_#ff4656c5]";
    case "Code":
      return "mx-2 p-1 text-[#454360] hover:decoration-4 bg-amber-300 transition-shadow duration-300 hover:shadow-[2px_2px_0px_1px_#ff4656c5]";
    case "Strategies":
      return "mx-2 p-1 text-[#454360] bg-emerald-300 transition-shadow duration-300 hover:shadow-[2px_2px_0px_1px_#ff4656c5]";
    case "Tutorial":
      return "mx-2 p-1 text-[#454360] bg-sky-300 transition-shadow duration-300 hover:shadow-[2px_2px_0px_1px_#ff4656c5]";
    case "General":
      return "mx-2 p-1 text-[#454360] bg-violet-300 transition-shadow duration-300 hover:shadow-[2px_2px_0px_1px_#ff4656c5]";
    default:
      return "";
  }
}
