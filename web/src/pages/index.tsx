import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import logoImg from "../assets/logo.svg";
import IconCheckImg from "../assets/icon-check.svg";
import usersAvatarExempleImg from "../assets/users-avatar-example.png";
import Image from "next/image";
import { NextPage } from "next";
import { api } from "../lib/axios";
import { FormEvent, useRef } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export const getServerSideProps = async () => {
  const [poolCountResponse, guessCountResponse, userCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count,
    },
  };
};

const Home: NextPage<HomeProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  async function createPool(e: FormEvent) {
    e.preventDefault();
    console.log(inputRef.current.value);

    try {
      const response = await api.post("pools", {
        title: inputRef.current.value,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      inputRef.current.value = "";

      alert(
        "Bolão criado com sucesso, o código foi copiado para a área de transferência!"
      );
    } catch (err) {
      console.log(err);
      alert("Falha ao criar o bolão, tente novamente");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto gap-28 grid grid-cols-2 items-center">
      <main className="">
        <Image src={logoImg} alt="NLW Logo" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>
        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExempleImg} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
            já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            ref={inputRef}
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual nome do seu bolão"
          />
          <button
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex justify-between text-gray-100">
          <div className="flex itens-center gap-6">
            <Image src={IconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span className="">Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600" />
          <div className="flex itens-center gap-6">
            <Image src={IconCheckImg} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span className="">Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>
      <Image
        src={appPreviewImg}
        alt="Dois exibindo uma prévia da aplicação móvel do NLW copa"
        quality={100}
      />
    </div>
  );
};

export default Home;
