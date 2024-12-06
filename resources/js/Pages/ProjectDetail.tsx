import PitsLayout from "../Layouts/PitsLayout";
import "yet-another-react-lightbox/styles.css";
import React, { useState } from "react";
import CapitalizeFirstLetter from "@/utils/CapitalizeFirstLetter";
import Button from "@/Components/Button";
import BackIcon from "@/src/icons/back";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import MainTitle from "@/Components/MainTitle";
import { Link } from "@inertiajs/react";
import Container from "@/Layouts/Container";

export default function projectDetail({ project, other_projects }) {
    const [index, setIndex] = useState(-1);

    const photos =
        project.images &&
        project.images.split(", ").map((image, index) => ({
            src: image,
            key: `${index}`,
        }));

    return (
        <PitsLayout>
            <Container>
                <Link href={route("projects")}>
                    <Button mode={"transparent"}>
                        <BackIcon /> Go Back
                    </Button>
                </Link>
                <div
                    className="h-80 mt-2 mb-10 text-white relative rounded-md"
                    style={{
                        background: `linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ),
        url(${project.thumbnail})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                    }}
                >
                    <div className="absolute top-1/2 left-16 -translate-y-1/2">
                        <h1 className="text-5xl font-bold mb-6">
                            {CapitalizeFirstLetter(project.title)}
                        </h1>
                        <div className="text-2xl">
                            <span>Project Type</span>
                            <span>: {project.type}</span>
                        </div>
                        <div className="text-2xl">
                            <span>Year</span>
                            <span>: {project.year}</span>
                        </div>
                    </div>
                </div>
                {/* description  */}
                <div className="sm:px-16">
                    <p className="font-bold text-2xl mb-4">Description: </p>
                    <p className="text-justify text-xl  leading-8 tracking-wide mb-5">
                        {project.description}
                    </p>
                    {project.url && (
                        <div className="mb-5">
                            <a href={project.url} target="_blank">
                                <Button>Visit Website</Button>
                            </a>
                        </div>
                    )}
                    {/* images  */}
                    {project.images && (
                        <>
                            <p className="font-bold text-2xl mb-4">Images: </p>
                            <div className="flex flex-wrap ">
                                {project.images
                                    .split(", ")
                                    .map((image, index) => (
                                        <img
                                            onClick={() => setIndex(index)}
                                            src={image}
                                            style={{ borderRadius: "14px" }}
                                            className="p-2 object-cover cursor-pointer hover:scale-105 duration-200 md:w-1/4 sm:w-1/2 w-full"
                                        />
                                    ))}
                            </div>
                            {/* https://yet-another-react-lightbox.com/ */}
                            <Lightbox
                                open={index >= 0}
                                index={index}
                                close={() => setIndex(-1)}
                                slides={photos}
                                plugins={[Zoom]}
                            />
                        </>
                    )}
                </div>
            </Container>

            {/* other projects  */}
            {other_projects.length > 0 && (
                <Container>
                    <MainTitle>Other Projects</MainTitle>
                    <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-3  sm:grid-cols-2 gap-8 ">
                        {other_projects.map((other) => (
                            <div className="w-full rounded-lg  bg-secondary shadow-lg relative project-card-container h-64">
                                <Link href={route("projectDetail", other.slug)}>
                                    <img
                                        className="rounded-lg shadow-lg object-cover w-full h-full"
                                        src={other.thumbnail}
                                        alt={
                                            "Pasa IT solution project " +
                                            other.title
                                        }
                                    />

                                    <div
                                        className="font-bold w-full px-4
                                            rounded-lg flex-col justify-center items-center slideup-overlay"
                                    >
                                        <h1 className="text-2xl text-white text-center mb-3">
                                            {" "}
                                            {other.title}
                                        </h1>
                                        <Link
                                            href={route(
                                                "projectDetail",
                                                other.slug
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
                </Container>
            )}
        </PitsLayout>
    );
}
