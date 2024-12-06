import Layout from "../Layouts/Layout";
import React, { useEffect, useState } from "react";
import { Head, Link, usePage } from "@inertiajs/react";
import RenderMyHtml from "@/utils/RenderMyHtml";
import MainTitle from "@/Components/MainTitle";
// Import Swiper React components
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Button from "@/Components/Button";
import Container from "@/Layouts/Container";
import Tag from "@/Components/Tag";
import { ActiveContext } from "@/src/activeContext";


//global and auth is comming form intertia request middleware
export default function Home({ services, clients, projects }) {
    const { info } = usePage().props;
    const nameOptimize = info.company_name.split(" ");
        // setting up active link for projects page
        // const { active, setActive } = React.useContext(ActiveContext);
        // useEffect(() => {
        //     setActive("home");
        // }, []);

    return (
        <div>
            <Layout isHomePage={true}>
                <div className="relative overflow-hidden lg:min-h-screen bg-primary">
                    <div className="mx-auto max-w-7xl">
                        <div className=" lg:min-h-screen relative  z-10 bg-primary pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32">
                            <svg
                                className="absolute inset-y-0 right-0 hidden h-screen w-48 translate-x-1/2 transform text-svghome lg:block"
                                fill="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </svg>

                            {/* for shape  */}
                            <div className="relative px-4 pt-6 sm:px-6 lg:px-8"></div>

                            <main className="lg:absolute lg:top-[55%] lg:-translate-y-1/2 mx-auto max-w-7xl px-4 sm:mt-0 mt-16 sm:px-6 lg:px-8">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className=" font-bold tracking-tight text-gray-900 sm:text-5xl md:text-[70px] text-4xl">
                                        <span className="block xl:inline text-purple-700">
                                            {nameOptimize[0] + " "}
                                        </span>
                                        <span className="block text-primary xl:inline">
                                            {nameOptimize.slice(1).join(" ")}
                                        </span>
                                    </h1>

                                    <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
                                        {info.company_slogan}
                                    </p>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div className="rounded-md shadow">
                                            <a
                                                href="#"
                                                className="flex w-full items-center justify-center rounded-sm border border-transparent bg-purple-600 px-8 py-3 text-base font-medium text-white hover:bg-purple-700 md:py-4 md:px-10 md:text-lg"
                                            >
                                                Get started
                                            </a>
                                        </div>
                                        <div className="mt-3 sm:mt-0 sm:ml-3">
                                            <Link
                                                href={route("projects")}
                                                className="flex w-full items-center justify-center rounded-sm border border-transparent bg-purple-100 px-8 py-3 text-base font-medium text-purple-700 hover:bg-purple-200 md:py-4 md:px-10 md:text-lg"
                                            >
                                                View Projects
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>

                    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full"
                            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                            alt=""
                        />
                    </div>
                </div>

                {/* container here  */}
                <Container id={"about"}>
                    <section>
                        <div
                            className="lg:flex lg:flex-row-reverse items-center
                  justify-between
                  overflow-hidden"
                        >
                            <div className=" lg:w-2/3 lg:pl-20 w-full">
                                <Tag>About Us</Tag>
                                <MainTitle>Know about us</MainTitle>

                                <p className="text-base text-primary text-justify text-body-color mb-9 leading-relaxed">
                                    {info.about_us}
                                </p>
                                <a>
                                    <Button mode="main">Learn More</Button>
                                </a>
                            </div>

                            <div className="relative inline-block z-10 lg:w-2/3 w-full lg:pt-0 pt-16">
                                <img
                                    src="https://images.unsplash.com/photo-1573495804683-641191e042ea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
                                    alt="image"
                                    className="mx-auto lg:ml-auto rounded-md"
                                />
                            </div>
                        </div>
                    </section>
                </Container>

                {/* services */}
                <Container id="services">
                    <section>
                        <MainTitle>Our Services</MainTitle>
                        <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-8 ">
                            {services.map((service) => (
                                <div className="w-full rounded-lg py-5  bg-secondary shadow-lg">
                                    <div className="flex flex-col items-center ">
                                        <div className="mb-3 h-16 w-16 p-3 text-4xl bg-purple-400 rounded-full shadow-lg flex justify-center items-center ">
                                            {RenderMyHtml(service.icon)}
                                        </div>
                                        <h5 className="mb-1 sm:px-5 px-2 text-2xl font-bold text-primary font-medium">
                                            {service.title}
                                        </h5>
                                        <div className="flex mt-2 space-x-3 md:mt-3 text-primary sm:px-5 px-2 text-justify">
                                            {service.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Container>
                {/* services end  */}

                {/* projects */}
                <Container>
                    <section id="projects">
                        <MainTitle>Our Projects</MainTitle>
                        <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 sm:grid-cols-2 gap-8 ">
                            {projects.map((project) => (
                                <div className="w-full rounded-lg  bg-secondary shadow-lg relative project-card-container">
                                    <Link
                                        href={route(
                                            "projectDetail",
                                            project.slug
                                        )}
                                    >
                                        <img
                                            className="rounded-lg shadow-lg object-cover w-full h-96"
                                            src={project.thumbnail}
                                            alt={
                                                "My Company " +
                                                project.title
                                            }
                                        />

                                        <div
                                            className="font-bold w-full px-4
                                            rounded-lg flex-col justify-center items-center slideup-overlay"
                                        >
                                            <h1 className="text-4xl text-white text-center mb-3">
                                                {" "}
                                                {project.title}
                                            </h1>
                                            <Link
                                                href={route(
                                                    "projectDetail",
                                                    project.slug
                                                )}
                                                className="text-sm
                                    font-medium
                                            text-white
                                            py-2
                                            px-5
                                            bg-purple-700
                                            inline-block
                                            mb-5"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex justify-center align-center">
                            <Link href={route("projects")}>
                                <Button>View All Projects</Button>
                            </Link>
                        </div>
                    </section>
                </Container>
                {/* projects end  */}

                {/* clients  */}
                <Container>
                    <div id="clients">
                        <MainTitle> Clients</MainTitle>
                        <div className="mt-10 w-[80%] mx-auto select-none">
                            <Swiper
                                modules={[Autoplay]}
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                spaceBetween={50}
                                slidesPerView={ window.innerWidth > 990 ? 3 : 1}
                                onSwiper={(swiper) => console.log(swiper)}
                                onSlideChange={() =>
                                    console.log("slide change")
                                }
                            >
                                {clients.map((client) => (
                                    <SwiperSlide>
                                        {" "}
                                        <div className="mb-3  flex justify-center items-center">
                                            <a
                                                href={client.url}
                                                target="_blank"
                                            >
                                                <div className="h-40 w-40 p-1  bg-purple-400 rounded-full relative client-card-container">
                                                    <img
                                                        src={client.logo}
                                                        className="rounded-full content-fit h-full w-full"
                                                    />
                                                    <div className="slideup-overlay h-40 w-40 p-3 rounded-full text-white justify-center items-center">
                                                        {client.title}
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </Container>
                {/* clients end  */}
            </Layout>
        </div>
    );
}
