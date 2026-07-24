import FormationCard from "./FormationCard";

export default function FormationGrid({ formations }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {formations.map((formation, index) => (
        <FormationCard key={index} formation={formation} />
      ))}
    </div>
  );
}
