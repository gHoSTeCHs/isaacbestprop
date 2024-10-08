import PropertyCard from '@/components/PropertyCard';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';
import NavBar from '@/components/sections/NavBar';
import Button from '@/components/ui/button';
import Header from '@/components/ui/header';
import PropertySearch, {
	PropertyFilters,
} from '@/components/ui/propertysearch';
import { database, storage } from '@/hooks/appwrite';
import { ArrowLeftIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link, useLocation } from 'react-router-dom';
import { propertyTypes } from '@/constants/data';

interface Files {
	imgUrls: string[];
	$id: string;
	title: string;
	description: string;
	location: string;
	price: string;
	images: string[];
	video?: string;
	propertyType?: string;
}

const Properties = () => {
	const { pathname } = useLocation();

	const [loading, setLoading] = useState(false);
	const [files, setFiles] = useState<Files[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [filteredFiles, setFilteredFiles] = useState<Files[]>([]);
	const [filters, setFilters] = useState<PropertyFilters>({
		priceRange: '',
	});
	const [selectedType, setSelectedType] = useState<string | null>(null);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await database.listDocuments(
					'66c73f49002e7b7365a3',
					'66c869070039e48ddbaf'
				);
				const docs = response.documents as unknown as Files[];

				const docsWithImageUrls = await Promise.all(
					docs.map(async (doc) => {
						const imageUrls = await Promise.all(
							doc.images.map(async (fileId) => {
								const imageUrl = await storage.getFileView(
									'66c75d710025bfd53abe',
									fileId
								);
								return imageUrl.href;
							})
						);

						return { ...doc, imgUrls: imageUrls };
					})
				);

				setFiles(docsWithImageUrls);
			} catch (error) {
				console.error(error);
				setError('Failed to load properties. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		const applyFilters = () => {
			let filtered = files;

			if (selectedType) {
				filtered = filtered.filter(
					(file) => file.propertyType === selectedType
				);
			}

			if (filters.priceRange) {
				const priceRanges = {
					'Less than 10 million': (price: number) => price < 10000000,
					'Less than 30 million': (price: number) => price < 30000000,
					'Less than 70 million': (price: number) => price < 70000000,
					'Above 100 million': (price: number) => price >= 100000000,
				};

				filtered = filtered.filter((file) => {
					const price = parseFloat(file.price);
					return priceRanges[filters.priceRange as keyof typeof priceRanges](
						price
					);
				});
			}

			setFilteredFiles(filtered);
		};

		applyFilters();
	}, [files, filters, selectedType]);

	const handleFilterChange = (newFilters: PropertyFilters) => {
		setFilters(newFilters);
	};

	const handleTypeClick = (type: string) => {
		setSelectedType(type);
		window.scrollTo(0, 0);
	};

	const handleBack = () => {
		setSelectedType(null);
		setFilters({ priceRange: '' });
		window.scrollTo(0, 0);
	};

	return (
		<div>
			<NavBar />
			<div className="container">
				<section className="py-12">
					{!selectedType ? (
						<>
							<Header
								title="Choose a Property Type"
								description="Select a property type to explore the available options."
								showAbstract={true}
							/>
							<div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
								{propertyTypes.map((type) => (
									<div
										key={type.name}
										className="flex flex-col gap-2 justify-center p-4 max-w-[300px] h-[428px] border border-border rounded-xl hover:scale-105 hover:bg-background-secondary/30 transition-all"
										onClick={() => handleTypeClick(type.name)}>
										<img
											loading="lazy"
											src={type.image}
											alt={type.name}
											className="w-full h-[200px] object-cover rounded-xl"
										/>
										<div className="flex flex-col gap-2">
											<h1 className="text-xl font-semibold">{type.name}</h1>
											<p className="text-sm text-txt">{type.description}</p>
										</div>
									</div>
								))}
							</div>
						</>
					) : (
						<>
							<Button
								onClick={handleBack}
								className="flex items-center gap-2 mb-4 text-blue-500 hover:underline">
								<ArrowLeftIcon /> <span>Back to Property Types</span>
							</Button>
							<PropertySearch onFilterChange={handleFilterChange} />
							{loading ? (
								<div className="flex items-center justify-center w-full h-screen">
									<div className="flex items-center gap-3">
										<SkeletonTheme baseColor="#191919">
											{Array.from({ length: 3 }).map((_, index) => (
												<div
													key={index}
													className="w-full border border-border py-5 px-4 rounded-lg lg:p-5 hover:scale-105 hover:bg-background-secondary/30 transition-all">
													<Skeleton height={200} />
													<Skeleton height={20} style={{ marginTop: '10px' }} />
													<Skeleton height={20} style={{ marginTop: '5px' }} />
													<Skeleton height={20} style={{ marginTop: '5px' }} />
												</div>
											))}
										</SkeletonTheme>
									</div>
								</div>
							) : error ? (
								<p className="text-red-500">{error}</p>
							) : filteredFiles.length < 1 ? (
								<div className="flex items-center justify-center w-full h-screen">
									<h3 className="text-xl font-semibold">
										No properties found for {selectedType}.
									</h3>
								</div>
							) : (
								<div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center mt-10">
									{filteredFiles.map((doc) => (
										<Link
											className="w-full"
											to={`/property/${encodeURIComponent(doc.title)}`}
											key={doc.$id}>
											<PropertyCard
												key={doc.$id}
												title={doc.title}
												location={doc.location}
												price={doc.price}
												images={doc.imgUrls}
												description={doc.description}
											/>
										</Link>
									))}
								</div>
							)}
						</>
					)}
				</section>
				<CTA />
				<Footer />
			</div>
		</div>
	);
};

export default Properties;
