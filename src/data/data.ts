import Beregovo from "assets/images/Beregovo.jpg";
import Chinadievo from "assets/images/Chinadievo.jpg";
import Hust from "assets/images/Hust.jpg";
import Irshava from "assets/images/Irshava.jpg";
import Ivanivci from "assets/images/Ivanivci.jpeg";
import Kolchyno from "assets/images/Kolchyno.jpg";
import Mezhigore from "assets/images/Mezhigore.jpg";
import NoveDavydkovo from "assets/images/NoveDavydkovo.jpg";
import Rikoshino from "assets/images/Rikoshino.jpg";
import Strabichevo from "assets/images/Strabichevo.jpg";
import Svaliava from "assets/images/Svaliava.jpg";
import Tyachiv from "assets/images/Tyachiv.jpg";
import VelykyBychkiv from "assets/images/VelykyBychkiv.jpg";
import VelykyLuchky from "assets/images/VelykyLuchky.jpg";
import Vinogradiv from "assets/images/Vinogradiv.jpg";
import Volovec from "assets/images/Volovec.jpg";
import Znjacovo from "assets/images/Znjacovo.jpg";

interface IData
{
	image: string;
	areas: string[];
}

export const data: Record<"Тячів" | "Виноградів" | "Берегове" | "Хуст" | "Свалява" | "Великий Бичків" | "Іршава" | "Міжгір'я" | "Воловець" | "Чинадійово" | "Ракошино" | "Страбичово" | "Великі Лучки" | "Зняцьово" | "Кольчино" | "Іванівці" | "Нове Давидково", IData> =
{
	"Тячів":
	{
		image: Tyachiv,
		areas: (
			"Тячів, Округла, Велика Уголька, Крива, Нересниця, Кричово, Новоселиця, Широкий Луг, Мала Уголька, Калини, Руське Поле, Терново, Угля, Грушово, Дулово, Чумальово, Вільхівчик, Тарасівка, Тячівка, Тересва, Підплеша, Вонігове, Вільхівці-Лази, Колодне, Ганичі, Топчино, Німецька Мокра, Дубове, Бедевля, Солотвино, Грушеве, Нижня Апша, Теребля, Усть-Чорна, Глиняний, Вільхівці, Глибокий Потік, Петрушів, Тисалово, Буштино, Руська Мокра, Ракове, Біловарці, Вишоватий, Груники, Красна, Лази, Новобарово, Руня, Нижній Дубовець, Лопухів, Добрянське".split(", ")
		)
	},
	"Виноградів":
	{
		image: Vinogradiv,
		areas: (
			"Пийтерфолво, Чорнотисів, Нове Село, Форголань, Ботар, Боржавське, Тисобикень, Перехрестя, Нове Клинове, Велика Копаня, Новоселиця, Затисівка, Теково, Сасово, Чепа, Гетиня, Дюла, Вилок, Букове, Широке, Мала Копаня, Карачин, Холмовець, Оклі, Гудя, Королево, Оклі Гедь, Шаланки, Онок, Руська Долина, Черна, Хижа, Фанчиково, Олешник, Підвиноградів, Велика Паладь, Веряця, Великі Ком'яти, Виноградів, Матійово, Фертешолмаш, Вербовець, Чорний Потік, Пушкіно, Дротинці, Тросник, Неветленфолу".split(", ")
		)
	},
	"Берегове":
	{
		image: Beregovo,
		areas: (
			"Астей, Чома, Мочола, Галабор, Велика Бийгань, Дийда, Запсонь, Квасово, Попово, Великі Береги, Берегуйфалу, Оросієво, Мала Бийгань, Гуняді, Мужієво, Четфалва, Нижні Ремети, Яноші, Горонглаб, Бодалово, Шом, Гать, Косонь, Балажер, Геча, Берегове, Верхні Ремети, Батрадь, Бене, Боржава, Велика Бакта, Вари, Кідьош".split(", ")
		)
	},
	"Хуст":
	{
		image: Hust,
		areas: (
			"Яблунівка, Забрідь, Березово, Кічерели, Крива, Крайниково, Кошельово, Сокирниця, Копашново, Липовець, Липецька Поляна, Іза, Забереж, Боронява, Нижній Бистрий, Велятино, Шаян, Чертіж, Драгово, Липча, Вишково, Золотарьово, Олександрівка, Нанково, Рокосово, Стеблівка, Монастирець, Горінчово, Нижнє Селище, Крайнє, Кіреші, Ракош, Хуст, Залом, Осава".split(", ")
		)
	},
	"Свалява":
	{
		image: Svaliava,
		areas: (
			"Свалява, Ганьковиця, Вовчий, Неліпино, Стройне, Мала Мартинка, Поляна, Пасіка, Родникова Гута, Уклин, Лопушанка, Солочин, Росош, Драчино, Керецьки, Павлово, Сасівка, Родниківка, Плав'я, Плоске, Голубине, Черник, Дусино, Тибава, Оленьово, Сусково, Яківське".split(", ")
		)
	},
	"Великий Бичків":
	{
		image: VelykyBychkiv,
		areas: (
			"Середнє Водяне, Рахів, Луги, Розтоки, Плаюць, Росішка, Костилівка, Хмелів, Верхнє Водяне, Чорна Тиса, Косівська Поляна, Водиця, Ділове, Видричка, Ясіня, Великий Бичків, Лазещина, Вільховатий, Богдан, Білин, Кваси, Луг, Кобилецька Поляна, Біла Церква".split(", ")
		)
	},
	"Іршава":
	{
		image: Irshava,
		areas: (
			"Імстичово, Іршава, Богаревиця, Мідяниця, Заріччя, Підгірне, Лисичово, Мала Розтока, Дешковиця, Бронька, Арданово, Брід, Нижнє Болотне, Дунковиця, Крайня Мартинка, Заболотне, Доробратово, Вільхівка, Суха, Луково, Білки, Великий Раковець, Чорний Потік, Осій, Гребля, Дубрівка, Довге, Кушниця, Загаття, Горбок, Малий Раковець, Ільниця, Лоза, Хмільник, Кам’янське, Сільце, Приборжавське".split(", ")
		)
	},
	"Міжгір'я":
	{
		image: Mezhigore,
		areas: (
			"Міжгір'я, Нижній Студений, Тюшка, Синевирська Поляна, Буковель, Торунь, Річка, Негровець, Голятин, Запереділля, Сойми, Майдан, Ізки, Лісковець, Сухий, Стригальня, Келечин, Верхній Бистрий, Вучкове, Лозянський, Синевир, Репинне, Новоселиця, Верхній Студений, Присліп, Колочава".split(", ")
		)
	},
	"Воловець":
	{
		image: Volovec,
		areas: (
			"Воловець, Збини, Абранка, Верхня Грабівниця, Пилипець, Скотарське, Завадка, Біласовиця, Канора, Гукливий, Нижні Ворота, Підполоззя, Верхні Ворота, Жденієво, Лази, Латірка, Подобовець, Верб'яж".split(", ")
		)
	},
	"Чинадійово":
	{
		image: Chinadievo,
		areas: (
			"Косино, Лецовиця, Вільховиця, Обава, Чинадійово, Бистриця".split(", ")
		)
	},
	"Ракошино":
	{
		image: Rikoshino,
		areas: (
			"Ракошино, Руське, Чопівці, Кайданово, Кальник, Бенедиківці".split(", ")
		)
	},
	"Страбичово":
	{
		image: Strabichevo,
		areas: (
			"Жнятино, Велика Добронь, Горонда, Батьово, Есень, Чомонин, Серне, Баркасово, Тисауйфалу, Мала Добронь, Червоне, Соловка, Петрівка, Демечі, Данилівка, Страбичово".split(", ")
		)
	},
	"Великі Лучки":
	{
		image: VelykyLuchky,
		areas: (
			"Пістрялово, Дерцен, Завидово, Павшино, Коноплівці, Червеньово, Барбово, Станово, Лалово, Нижній Коропець, Зубівка, Макарьово, Новоселиця, Куштановиця, Верхній Коропець, Чабанівка, Великі Лучки, Форнош, Березинка, Яблунів, Залужжя".split(", ")
		)
	},
	"Зняцьово":
	{
		image: Znjacovo,
		areas: (
			"Зняцьово".split(", ")
		)
	},
	"Кольчино":
	{
		image: Kolchyno,
		areas: (
			"Кольчино, Клочки, Кленовець, Верхня Визниця".split(", ")
		)
	},
	"Іванівці":
	{
		image: Ivanivci,
		areas: (
			"Клячаново, Лавки, Іванівці, Лохово, Бобовище, Старе Давидково".split(", ")
		)
	},
	"Нове Давидково":
	{
		image: NoveDavydkovo,
		areas: (
			"Нове Давидково, Ключарки".split(", ")
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
