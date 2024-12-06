import PitsLayout from "../Layouts/PitsLayout";
import React, { useEffect } from "react";
import MainTitle from "@/Components/MainTitle";
import CapitalizeFirstLetter from "@/utils/CapitalizeFirstLetter";
import Button from "@/Components/Button";
import { Link } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import Container from "@/Layouts/Container";
import { ActiveContext } from "@/src/activeContext";

export default function Projects({ projects }) {
    // setting up active link for projects page
    const { active, setActive } = React.useContext(ActiveContext);
    useEffect(() => {
        setActive("projects");
    }, []);

    return (
        <PitsLayout>
            <Container>
                <MainTitle>Our Projects</MainTitle>
                {projects.data.map((project, index) => (
                    <div
                        className={`flex mb-8 flex-col ${
                            index % 2 == 0
                                ? "sm:flex-row-reverse"
                                : "sm:flex-row"
                        }`}
                        key={index}
                    >
                        <div className="sm:p-5 sm:w-[40%]">
                            <Link href={route("projectDetail", project.slug)}>
                                {" "}
                                <img
                                    src={project.thumbnail}
                                    loading="lazy"
                                    className="h-96 w-full object-cover rounded-md hover:scale-110 duration-150"
                                />
                            </Link>
                        </div>
                        <div className="sm:p-5 sm:w-[60%]">
                            <h1 className="text-4xl mb-3 font-bold w-auto">
                                <Link
                                    className="block w-fit underline-title"
                                    href={route("projectDetail", project.slug)}
                                >
                                    {" "}
                                    {CapitalizeFirstLetter(project.title)}
                                </Link>
                            </h1>
                            <p className="text-xl text-justify mb-5">
                                {project.description.slice(0, 400)}...
                            </p>
                            <Link href={route("projectDetail", project.slug)}>
                                {" "}
                                <Button>View Details</Button>
                            </Link>
                        </div>
                    </div>
                ))}
                <div>
                    <Pagination links={projects.links} />
                </div>
            </Container>
        </PitsLayout>
    );
}
