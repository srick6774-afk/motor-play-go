import cg160 from "@/assets/moto-cg160.jpg";
import biz125 from "@/assets/moto-biz125.jpg";
import fazer250 from "@/assets/moto-fazer250.jpg";
import pcx160 from "@/assets/moto-pcx160.jpg";
import lander250 from "@/assets/moto-lander250.jpg";
import xre300 from "@/assets/moto-xre300.jpg";

export type Moto = {
  id: string;
  nome: string;
  categoria: "Urbana" | "Scooter" | "Esportiva" | "Trail";
  cilindrada: string;
  cambio: string;
  consumo: string;
  precoDia: number;
  imagem: string;
  destaque?: string;
};

export const motos: Moto[] = [
  {
    id: "cg-160",
    nome: "Honda CG 160 Start",
    categoria: "Urbana",
    cilindrada: "160cc",
    cambio: "Manual",
    consumo: "38 km/l",
    precoDia: 79,
    imagem: cg160,
    destaque: "Mais alugada",
  },
  {
    id: "biz-125",
    nome: "Honda Biz 125",
    categoria: "Scooter",
    cilindrada: "125cc",
    cambio: "Automático",
    consumo: "45 km/l",
    precoDia: 69,
    imagem: biz125,
    destaque: "Mais econômica",
  },
  {
    id: "fazer-250",
    nome: "Yamaha Fazer 250",
    categoria: "Esportiva",
    cilindrada: "250cc",
    cambio: "Manual",
    consumo: "30 km/l",
    precoDia: 129,
    imagem: fazer250,
  },
  {
    id: "pcx-160",
    nome: "Honda PCX 160",
    categoria: "Scooter",
    cilindrada: "160cc",
    cambio: "Automático",
    consumo: "40 km/l",
    precoDia: 149,
    imagem: pcx160,
    destaque: "Conforto",
  },
  {
    id: "lander-250",
    nome: "Yamaha Lander 250",
    categoria: "Trail",
    cilindrada: "250cc",
    cambio: "Manual",
    consumo: "28 km/l",
    precoDia: 159,
    imagem: lander250,
  },
  {
    id: "xre-300",
    nome: "Honda XRE 300",
    categoria: "Trail",
    cilindrada: "300cc",
    cambio: "Manual",
    consumo: "26 km/l",
    precoDia: 189,
    imagem: xre300,
    destaque: "Aventura",
  },
];

export const formatarPreco = (valor: number) =>
  valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
