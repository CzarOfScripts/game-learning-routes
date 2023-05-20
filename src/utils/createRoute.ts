export default function createRoute(city: string, regions: string[]): { city: string, region: string; }[]
{
	return regions.map((region) => ({ city, region }));
}
