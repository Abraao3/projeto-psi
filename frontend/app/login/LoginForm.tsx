"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./form.css";
import Swal from "sweetalert2";


export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function requisitarLogin(data: {
    email: string;
    password: string;
  }) {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const url = `${apiUrl}/api/login`;
      const options = {
          method: "POST",
          credentials: "include" as RequestCredentials,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
      };

      const response = await fetch(url, options);
      const result = await response.json();

      return result.message;
      
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      email: String(formData.get("email")),
      password: String(formData.get("senha")),
    };

    const result = await requisitarLogin(data);
    if (result) {
      Swal.fire({
        title:"Login",
        text: result,
        icon: getItemByStatus
      })
    }
    setIsSubmitting(false);

    // router.push("/");
  }

  return (
    <main className="flex justify-center">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-2 bg-gray-800 rounded-xl p-2 px-5"
      >
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" required />

        <label htmlFor="senha">Senha</label>
        <input type="password" id="senha" name="senha" required />

        <button
          className="rounded cursor-pointer"
          type="submit"
          disabled={isSubmitting}
        >
          {
            isSubmitting ? "Entrando..." : "Iniciar sessão"
            // OPERADOR TERNÁRIO
            // condição ? True : False

            // se a variavel for true, retorna Entrando..., se for false, retorna iniciar sessão
          }
        </button>
      </form>
    </main>
  );
}
