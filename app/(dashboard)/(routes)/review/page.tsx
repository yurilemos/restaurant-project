"use client";
import { useRouter } from "next/navigation";

function ReviewPage() {
  const router = useRouter();

  const goBack = () => {
    router.back(); // Isso redirecionará para a página anterior
  };

  return (
    <div>
      <button onClick={goBack}>Voltar</button>
      <div>TESTE</div>
    </div>
  );
}

export default ReviewPage;
