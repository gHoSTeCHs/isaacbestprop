import NavBar from '@/components/sections/NavBar';
import ReactPlayer from 'react-player/youtube';
import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/ui/imgcarousel';
import Header from '@/components/ui/header';
import Button from '@/components/ui/button';
import Footer from '@/components/sections/Footer';
import CTA from '@/components/sections/CTA';
import { Link, useLocation, useParams } from 'react-router-dom';
import { database, storage } from '@/hooks/appwrite';
import { useEffect, useState } from 'react';
import { Query } from 'appwrite';
import { Loader } from 'lucide-react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface File {
	images: [];
	title: string;
	location: string;
	price: string;
	imgUrls: string[];
	description: string;
	amenities: string[];
	bedrooms: string;
	bathroom: string;
	link: string;
}

const formSchema = z.object({
	name: z.string().min(3, 'Name must be at least 3 characters long'),
	email: z.string().email('Invalid email address'),
	number: z
		.string()
		.min(7, 'Phone number must be at least 7 characters long')
		.max(11, 'Phone number must be at most 12 characters long'),
	message: z.string().min(30, 'Message must be at least 30 characters long'),
});

const OPTIONS: EmblaOptionsType = {};

const Property = () => {
	const { pathname } = useLocation();

	const [property, setProperty] = useState<File | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { title } = useParams<{ title: string }>();

	const SLIDES = property?.imgUrls || [];
	const decodedTitle = title ? decodeURIComponent(title) : '';

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			number: '',
			message: '',
		},
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	const fetchProperty = async () => {
		setProperty(null);
		setError(null);

		try {
			const response = await database.listDocuments(
				'66c73f49002e7b7365a3',
				'66c869070039e48ddbaf',
				[Query.equal('title', decodedTitle)]
			);

			if (response.documents.length === 0) {
				setError('No property found with this title');
				return;
			}

			const doc = response.documents[0] as unknown as File;

			const imageUrls = await Promise.all(
				doc.images.map(async (fileId) => {
					const imageUrl = await storage.getFileView(
						'66c75d710025bfd53abe',
						fileId
					);
					return imageUrl.href;
				})
			);

			setProperty({ ...doc, imgUrls: imageUrls });
		} catch (error) {
			setError('Failed to load property data');
			setError(error as string);
			console.error(error);
		}
	};

	let NGN = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'NGN',
		maximumFractionDigits: 0,
	});

	useEffect(() => {
		if (decodedTitle) {
			fetchProperty();
		}
	}, [decodedTitle]);

	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data);

		const subject = encodeURIComponent('Contact Form Submission');
		const body = encodeURIComponent(`
    Name: ${data.name}
    Email: ${data.email}
    Phone Number: ${data.number}
    Message:
    ${data.message}
  `);

		window.location.replace(
			`mailto:isaacamuchie@gmail.com?subject=${subject}&body=${body}`
		);
	};

	return (
		<>
			<NavBar />
			<div className="container">
				{error && <p className="text-red-500">{error}</p>}
				{property ? (
					<>
						<div className="flex flex-col gap-3 py-5">
							<h1 className="text-xl font-bold">{property?.title}</h1>
							<div className="flex gap-5 items-center">
								<div className="inline-flex items-center gap-2 justify-start border border-border p-2 rounded-lg">
									<Link to={'/'}>
										<svg
											width="14"
											height="18"
											viewBox="0 0 14 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M6.61646 17.1259C6.64163 17.1405 6.66141 17.1517 6.67542 17.1596L6.69869 17.1726C6.88441 17.2745 7.1148 17.2738 7.3007 17.1729L7.32458 17.1596C7.33859 17.1517 7.35837 17.1405 7.38354 17.1259C7.43388 17.0967 7.50581 17.0542 7.59625 16.9985C7.77705 16.8872 8.03229 16.723 8.33718 16.5076C8.94591 16.0776 9.75812 15.4395 10.5721 14.6061C12.1922 12.9474 13.875 10.4551 13.875 7.25C13.875 3.45304 10.797 0.375 7 0.375C3.20304 0.375 0.125 3.45304 0.125 7.25C0.125 10.4551 1.80777 12.9474 3.42788 14.6061C4.24188 15.4395 5.05409 16.0776 5.66282 16.5076C5.96771 16.723 6.22295 16.8872 6.40375 16.9985C6.49419 17.0542 6.56612 17.0967 6.61646 17.1259ZM7 9.75C8.38071 9.75 9.5 8.63071 9.5 7.25C9.5 5.86929 8.38071 4.75 7 4.75C5.61929 4.75 4.5 5.86929 4.5 7.25C4.5 8.63071 5.61929 9.75 7 9.75Z"
												fill="blue"
											/>
										</svg>
									</Link>

									<p>{property?.location}</p>
								</div>

								<p className="font-bold text-xl">
									<span className="text-sm text-txt font-normal mr-2">
										Price
									</span>
									{/* {formatAmount('1798300000')} */}
									{NGN.format(parseInt(property.price))}
								</p>
							</div>
						</div>

						<EmblaCarousel slides={SLIDES} options={OPTIONS} />

						<div className="border border-border p-4 rounded-md mt-5">
							<div className="flex flex-col gap-2">
								<h1 className="font-bold text-lg">Description</h1>
								<p className="text-txt text-sm font-medium mb-3">
									{property.description}
								</p>
							</div>
							<div className="text-left flex gap-[30%]">
								<div>
									<div className="flex items-center gap-2 mb-1">
										<svg
											width="20"
											height="18"
											viewBox="0 0 20 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_4_285)">
												<path
													d="M10.0119 15.9597C7.0137 15.9597 4.01627 15.9597 1.01806 15.9597C0.714934 15.9597 0.574786 16.0984 0.574786 16.3977C0.574786 16.4752 0.578723 16.5527 0.573999 16.6295C0.5677 16.7225 0.558252 16.8155 0.54093 16.9062C0.476368 17.2372 0.159068 17.5023 -0.220432 17.4984C-0.601507 17.4946 -0.917233 17.2116 -0.974709 16.8481C-0.988094 16.7628 -0.99518 16.6752 -0.99518 16.5891C-0.995967 14.8279 -1.00778 13.0659 -0.991243 11.3046C-0.981795 10.2783 -0.602295 9.38527 0.125212 8.64186C0.566913 8.19069 1.09207 7.86976 1.69282 7.66511C2.16522 7.50465 2.65338 7.45581 3.15098 7.45581C7.76246 7.45736 12.3739 7.45348 16.9854 7.45891C18.3365 7.46046 19.4309 7.9969 20.2419 9.06356C20.6403 9.58837 20.8781 10.1845 20.9592 10.8357C20.9867 11.055 20.9985 11.2783 20.9993 11.5C21.0025 13.2101 21.0017 14.9202 21.0009 16.6302C21.0009 16.8977 20.934 17.1411 20.7104 17.3178C20.4741 17.5046 20.2104 17.5535 19.9293 17.4395C19.66 17.3295 19.49 17.1271 19.4514 16.838C19.4317 16.6922 19.4341 16.5426 19.4301 16.3953C19.4238 16.1574 19.3238 16.0139 19.1239 15.9698C19.0798 15.9597 19.0333 15.9605 18.9876 15.9605C15.9965 15.9605 13.0054 15.9605 10.0135 15.9605L10.0119 15.9597Z"
													fill="blue"
												/>
												<path
													d="M9.90246 0.5C11.8472 0.5 13.7912 0.5 15.7351 0.5C16.3862 0.5 16.9949 0.643411 17.52 1.03953C18.1956 1.54884 18.59 2.21938 18.6231 3.06124C18.6514 3.77519 18.6388 4.4907 18.642 5.20543C18.6444 5.66589 18.642 6.12636 18.642 6.58682C18.642 6.62791 18.6396 6.67132 18.6286 6.71085C18.5948 6.83566 18.5263 6.88527 18.3971 6.86124C18.2562 6.83488 18.12 6.77829 17.979 6.76279C17.6476 6.72713 17.3153 6.70233 16.9823 6.68527C16.7602 6.67364 16.6917 6.63411 16.6602 6.41938C16.5595 5.73876 15.9194 5.12636 15.1005 5.13566C14.1872 5.14574 13.2739 5.13798 12.3613 5.13798C11.6819 5.13798 11.1016 5.53643 10.8709 6.16434C10.8378 6.25426 10.8252 6.35194 10.8079 6.44651C10.7756 6.61628 10.7119 6.67984 10.5402 6.68217C10.1804 6.68605 9.81979 6.68605 9.45997 6.68217C9.29463 6.68062 9.22928 6.61628 9.19936 6.42791C9.15763 6.16357 9.0537 5.92791 8.88364 5.72093C8.57579 5.34574 8.17739 5.14186 7.68609 5.13953C6.74363 5.13488 5.80118 5.13721 4.85794 5.13876C4.06587 5.13953 3.44623 5.74884 3.34545 6.41783C3.31317 6.63411 3.24782 6.67209 3.02579 6.68605C2.6581 6.71008 2.29041 6.74419 1.92351 6.78295C1.81092 6.79457 1.70305 6.84264 1.59125 6.86124C1.47078 6.88062 1.41488 6.84031 1.38103 6.72403C1.36764 6.67829 1.36134 6.62946 1.36134 6.5814C1.36055 5.47674 1.3456 4.37209 1.36449 3.26744C1.38418 2.11163 1.92666 1.26202 2.988 0.748062C3.40844 0.545736 3.86431 0.5 4.3257 0.5C6.18462 0.5 8.04354 0.5 9.90246 0.5Z"
													fill="blue"
												/>
											</g>
											<defs>
												<clipPath id="clip0_4_285">
													<rect
														width="22"
														height="17"
														fill="blue"
														transform="translate(-1 0.5)"
													/>
												</clipPath>
											</defs>
										</svg>
										<p className="text-txt text-sm font-medium">Bedrooms</p>
									</div>
									<h1 className="font-semibold text-lg">{property.bedrooms}</h1>
								</div>
								<div>
									<div className="flex items-center gap-2 mb-1">
										<svg
											width="20"
											height="21"
											viewBox="0 0 20 21"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<g clipPath="url(#clip0_4_290)">
												<g clipPath="url(#clip1_4_290)">
													<path
														d="M0.269455 14.2615H10.11V16.0696H16.2615V14.2654H18.7054C18.8637 16.4157 18.8761 18.3303 16.6707 19.7896C16.6437 19.8074 16.6221 19.8317 16.5623 19.8849C16.8335 20.1101 17.1009 20.3328 17.3655 20.5528C17.0082 20.8943 16.7212 21.1689 16.3922 21.4841C16.1019 21.1846 15.7879 20.8372 15.4458 20.5206C15.3453 20.4274 15.1673 20.3893 15.0215 20.3801C14.7831 20.3656 14.5414 20.4044 14.301 20.405C11.1057 20.407 7.91048 20.4063 4.71457 20.4063C4.56154 20.4063 4.398 20.4359 4.25679 20.3932C3.83054 20.2651 3.55994 20.4628 3.30642 20.7682C3.09034 21.0283 2.84405 21.2628 2.61877 21.5005C2.31468 21.1807 2.03949 20.8917 1.73474 20.5705C1.939 20.3899 2.19843 20.16 2.49004 19.9013C2.28906 19.7574 2.13866 19.6576 1.99614 19.5473C0.928209 18.7243 0.350896 17.6327 0.275366 16.2922C0.23793 15.6282 0.268798 14.9603 0.268798 14.2615H0.269455Z"
														fill="blue"
													/>
													<path
														d="M0.275543 9.28721C0.270288 9.16834 0.261093 9.06128 0.261093 8.95423C0.260437 7.21375 0.258466 5.47393 0.261093 3.73345C0.26372 1.8209 1.59108 0.486313 3.50101 0.500106C4.14203 0.504703 4.80275 0.491568 5.41882 0.636717C6.5117 0.894833 7.20001 1.65276 7.53235 2.72069C7.59671 2.92824 7.68012 3.02872 7.90803 3.09046C9.19401 3.43921 10.0964 4.64113 10.1128 5.98228C10.1155 6.19836 10.1128 6.41444 10.1128 6.64891H4.02578C3.73548 5.11401 4.56959 3.52985 6.31335 3.03529C6.15573 2.35027 5.48121 1.7723 4.7732 1.74734C4.23792 1.72829 3.70067 1.72632 3.16539 1.74734C2.24261 1.78346 1.50044 2.63071 1.4965 3.64676C1.48994 5.39774 1.49453 7.14938 1.49453 8.90037C1.49453 9.0199 1.49453 9.13944 1.49453 9.28656H0.274229L0.275543 9.28721Z"
														fill="blue"
													/>
													<path
														d="M10.0931 13.0328C9.96436 13.0328 9.86781 13.0328 9.77126 13.0328C6.64366 13.0328 3.5154 13.0335 0.387794 13.0321C-0.285409 13.0321 -0.769459 12.7136 -0.939566 12.1698C-1.19571 11.3514 -0.615771 10.5633 0.268259 10.5515C1.20877 10.539 2.14929 10.5482 3.0898 10.5482C5.29922 10.5482 7.50798 10.5482 9.71741 10.5482C9.83563 10.5482 9.95385 10.5482 10.0931 10.5482V13.0321V13.0328Z"
														fill="blue"
													/>
													<path
														d="M15.0237 14.871H11.3634C11.3575 14.7554 11.3477 14.6503 11.3477 14.5452C11.3464 13.277 11.3464 12.0081 11.3477 10.7398C11.3483 9.8223 11.8494 9.31789 12.763 9.31395C13.1019 9.31263 13.4408 9.30541 13.7797 9.31592C14.5409 9.34022 15.0381 9.85185 15.0401 10.615C15.044 11.9385 15.0414 13.2612 15.0401 14.5846C15.0401 14.6707 15.0309 14.7561 15.0237 14.871Z"
														fill="blue"
													/>
													<path
														d="M16.2832 13.021V10.5482C16.8782 10.5482 17.4648 10.5462 18.0506 10.5489C18.356 10.5502 18.668 10.5252 18.9668 10.5745C19.619 10.6822 20.0433 11.2162 20.0164 11.8395C19.9901 12.4509 19.5389 12.9757 18.8985 13.0092C18.0394 13.0545 17.1764 13.0204 16.2839 13.0204L16.2832 13.021Z"
														fill="blue"
													/>
												</g>
											</g>
											<defs>
												<clipPath id="clip0_4_290">
													<rect
														width="20"
														height="20"
														fill="blue"
														transform="translate(0 0.5)"
													/>
												</clipPath>
												<clipPath id="clip1_4_290">
													<rect
														width="21.0171"
														height="21"
														fill="blue"
														transform="translate(-1 0.5)"
													/>
												</clipPath>
											</defs>
										</svg>
										<p className="text-txt text-sm font-medium"> Bathrooms</p>
									</div>
									<h1 className="font-semibold text-lg">{property.bathroom}</h1>
								</div>
							</div>
						</div>

						<div className="flex flex-col gap-4 border border-border rounded-md p-4 mt-5">
							<h1 className="font-semibold text-lg">
								Key Features and Amenities
							</h1>
							<div className="flex flex-col gap-4">
								{property.amenities.map((amenity, index) => (
									<div
										key={index}
										className="flex gap-4 items-center p-3 border border-l-btn border-r-0 border-t-0 border-b-0 bg-gradient-to-r from-background-secondary to-background-primary">
										<svg
											width="14"
											height="16"
											viewBox="0 0 14 16"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M8.96142 0.196214C9.18735 0.322171 9.29825 0.58597 9.23019 0.835523L7.73646 6.31252H13.1875C13.4115 6.31252 13.6141 6.44541 13.7034 6.65084C13.7927 6.85626 13.7516 7.09508 13.5987 7.25882L5.72373 15.6963C5.54724 15.8854 5.26453 15.9298 5.0386 15.8038C4.81268 15.6779 4.70177 15.4141 4.76983 15.1645L6.26356 9.68752H0.812512C0.588527 9.68752 0.385886 9.55463 0.296617 9.3492C0.207348 9.14378 0.248464 8.90496 0.401294 8.74121L8.27629 0.303715C8.45279 0.114615 8.73549 0.0702568 8.96142 0.196214Z"
												fill="blue"
											/>
										</svg>
										<p className="text-sm text-txt font-medium ">{amenity}</p>
									</div>
								))}
							</div>
						</div>

						<div className="py-4 mt-4 rounded-md">
							{property.link ? (
								<ReactPlayer url={property.link} width={'100%'} />
							) : (
								<p>No Video avaliable</p>
							)}
						</div>
						<div className="py-9">
							<Header
								title={`Inquire About ${property.title}`}
								description="Interested in this property? Contact us via Whatsapp or via email to get started with the acquiring this great real estate"
								showAbstract={true}
							/>
							<div className="flex flex-col gap-5 mt-5">
								<div>
									<a
										href={`https://wa.me/+2348035450948?text=Hello!${encodeURIComponent(
											` I would like to inquire about ${property.title} located at ${property.location}.`
										)}`}
										className="flex items-center gap-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											x="0px"
											y="0px"
											width="50"
											height="50"
											viewBox="0 0 48 48">
											<path
												fill="#fff"
												d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path>
											<path
												fill="#fff"
												d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path>
											<path
												fill="#cfd8dc"
												d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path>
											<path
												fill="#40c351"
												d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path>
											<path
												fill="#fff"
												fill-rule="evenodd"
												d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
												clip-rule="evenodd"></path>
										</svg>
										<p>Send a message</p>
									</a>
								</div>

								<div className="border border-border p-4 rounded-md mt-6">
									<form
										className="flex flex-col gap-4"
										onSubmit={handleSubmit(onSubmit)}>
										<div className="flex flex-col gap-2">
											<label htmlFor="name" className="text-base font-semibold">
												First Name
											</label>
											<input
												id="name"
												type="text"
												{...register('name')}
												name="name"
												className="bg-background-secondary w-full border border-border rounded-md p-3"
												placeholder="Enter First Name"
											/>
										</div>

										<div className="flex flex-col gap-2">
											<label
												htmlFor="email"
												className="text-base font-semibold">
												Email
											</label>
											<input
												id="email"
												type="email"
												{...register('email')}
												name="email"
												className="bg-background-secondary w-full border border-border rounded-md p-3"
												placeholder="Enter Email"
											/>
										</div>
										<div className="flex flex-col gap-2">
											<label
												htmlFor="number"
												className="text-base font-semibold">
												Number
											</label>
											<input
												id="number"
												type="text"
												{...register('number')}
												name="number"
												className="bg-background-secondary w-full border border-border rounded-md p-3"
												placeholder="Enter Phone Number"
											/>
											{errors.number && (
												<p className="text-red-500">{errors.number.message}</p>
											)}
										</div>
										<div className="flex flex-col gap-2">
											<label
												htmlFor="message"
												className="text-base font-semibold">
												Message
											</label>
											<textarea
												id="message"
												// name="message"
												{...register('message')}
												rows={5}
												className="bg-background-secondary w-full border border-border rounded-md p-3 "
												placeholder="Enter First Name"
											/>
											{errors.message && (
												<p className="text-red-500">{errors.message.message}</p>
											)}
										</div>

										<Button variant="secondary" className="mt-5">
											Submit
										</Button>
									</form>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="flex justify-center h-screen items-center">
						<Loader className=" animate-spin w-8 h-8" />
					</div>
				)}
			</div>
			<CTA />
			<Footer />
		</>
	);
};

export default Property;
