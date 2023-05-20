import Beregovo from "assets/images/Beregovo.jpg";
import Hust from "assets/images/Hust.jpg";
import Svaliava from "assets/images/Svaliava.jpg";
import Tyachiv from "assets/images/Tyachiv.jpg";
import Vinogradiv from "assets/images/Vinogradiv.jpg";

export const data =
{
	"Тячів":
	{
		image: Tyachiv,
		areas: (
			"Округла, Нижня Апша, Підплеша, Вонігове, Терново, Ракове, Велика Уголька, Теребля, Біловарці, Вільхівці-Лази, Угля, Вишній Дубовець, Крива, Усть-Чорна, Вишоватий, Колодне, Грушово, Груники, Нересниця, Глиняний, Красна, Ганичі, Дулово, Лази, Кричево, Вільхівці, Новобарово, Топчино, Чумальово, Руня, Новоселиця, Глибокий Потік, Нижній, Дубовець, Німецька Мокра, Вільхівчик, Лопухів, Широкий Луг, Петрушів, Добрянське, Дубове, Тарасівка, Мала Уголька, Тисалово, Бедевля, Тячівка, Калини, Буштино, Солотвино, Тересва, Руське Поле, Руська Мокра".split(", ")
		)
	},
	"Виноградів":
	{
		image: Vinogradiv,
		areas: (
			"Боржавське, Ботар, Букове, Велика Копаня, Велика Паладь, Великі Ком'яти, Вербовець, Вилок, Карачинів, Королево, Мала Копаня, Неветленфолу, Нове Село, Олешник, Онок, Перехрестя, Пийтерфолво, Підвиноградів, Пушкіно, Руська Долина, Фертешолмаш, Чорний Потік, Шаланки, Широке, Виноградів, Чепа, Теково, Сусково, Дюла, Чорнотисів, Сасово, Веряця, Черна, Матійово, Тисобикень, Тросник, Фанчиково, Хижа, Новоселиця, Гетиня, Оклі Гедь, Холмовець".split(", ")
		)
	},
	"Берегове":
	{
		image: Beregovo,
		areas: (
			"Астей, Чома, Мочола, Дийда, Запсонь, Квасово, Великі Береги, Берегуйфалу, Оросієво, Мала Бийгань, Мужієво, Четфалва, Нижні Ремети, Яноші, Горонглаб, Бадалово, Шом, Гать, Косонь (Косино), Балажер, Геча, Берегове, Верхні Ремети, Батрадь, Бене, Боржава, Велика Бакта, Вари, Кідьош".split(", ")
		)
	},
	"Хуст":
	{
		image: Hust,
		areas: (
			"Яблунівка, Забрідь, Березово, Крива, Крайниково, Кошельово, Сокирниця, Копашново, Липецька Поляна, Іза, Забереж, Боронява, Данилово, Нижній Бистрий, Велятино, Шаян, Драгово, Липча, Вишково, Золотарьово, Олександрівка, Нанково, Рокосово, Стеблівка, Монастирець, Горінчово, Нижнє Селище, Кіреші, Ракош, Залом".split(", ")
		)
	},
	"Свалява":
	{
		image: Svaliava,
		areas: (
			"Неліпино, Стройне, Мала Мартинка, Поляна, Пасіка, Лопушанка, Солочин, Березники, Росош, Драчино, Керецьки, Сасівка, Родниківка, Плав'я, Плоске, Голубине, Чорниця, Дусино, Тибава, Сусково, Яківське".split(", ")
		)
	}
};
export type CitiesNameType = keyof typeof data;

export function getCityImage(city: CitiesNameType | null)
{
	if (city === null)
	{
		return "";
	}

	return data[ city ].image;
}
