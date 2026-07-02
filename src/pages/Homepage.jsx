import {
    AlbumCollection,
    HeroSection,
    MoreAboutSection,
    PhotographyShowcase
} from "../pageComponents/homepage";

export default function Homepage() {
    return (
        <>
            <HeroSection />
            <PhotographyShowcase />
            <AlbumCollection />
            <MoreAboutSection />
        </>
    )
}