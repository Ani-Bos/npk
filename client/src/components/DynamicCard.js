import CropContent from "./CropContent";

const DynamicCard = ({ crop }) => {
  // Find the crop content based on the crop ID
  const cropContent = CropContent.find((item) => item.id === crop);

  return (
    <div class="p-10">
      <div class="max-w-sm rounded-xl overflow-hidden shadow-lg">
        <img
          class="w-full"
          src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Mountain"
        ></img>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{crop}</div>
          <p class="text-gray-700 text-base">
            {cropContent ? cropContent.content : "Crop content not found."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DynamicCard;