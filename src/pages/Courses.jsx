import React from "react";
import imgCourses from "../images/courses.png";
import imgChart from "../images/chart.png";
import imgExercices from "../images/penandpaper.png";
import CardCourses from "../components/Cards/CardCourses";
import YoutubeThumbnails from "../components/YoutubeThumbnails";
import { useHorizontalScroll } from "../utils/utils";

function Courses() {
  const scrollRef = useHorizontalScroll();
  const scrollRef2 = useHorizontalScroll();
  /* fetching data from youtube API */
  const YOUTUBE_PLAYLIST_ITEMS_API =
    "https://www.googleapis.com/youtube/v3/playlistItems";

  const fetchDataFromYoutube = async () => {
    const res = await fetch(
      `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLfSUFKdFlttlrDw2756XyiZXrjdTOw9UH&maxResults=50&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    );
    const data = await res.json();
    console.log(data);
    setYoutubeItems(data.items);
  };

  React.useEffect(() => {
    fetchDataFromYoutube();
  }, []);

  const [youtubeItems, setYoutubeItems] = React.useState([]);

  return (
    <div className="flex-1 bg-third flex-col pl-20 pr-20 pt-10 pb-10">
      {/* first row Exercices */}
      <section className="flex flex-col w-full h-1/4">
        <h2 className="text-white font-bold  text-3xl mb-8">Exercices</h2>
        <div className="flex w-full">
          <img
            src={imgExercices}
            height={130}
            width={130}
            className="mr-10"
            alt="exercices"
          />
          <div className="flex  overflow-x-scroll gap-10" ref={scrollRef}>
            <CardCourses name="The simple present" level="easy" disable />
            <CardCourses name="The present progressive" level="easy" disable />
            <CardCourses name="The past" level="medium" disable />
            <CardCourses name="The simple past" level="medium" disable />
            <CardCourses name="The past continous" level="medium" disable />
            <CardCourses name="The present perfect" level="medium" disable />
            <CardCourses
              name="The present perfect progressive"
              level="hard"
              disable
            />
            <CardCourses name="The simple future" level="easy" disable />
            <CardCourses name="The future progressive" level="medium" disable />
            <CardCourses name="The future perfect" level="hard" disable />
            <CardCourses name="The passive voice" level="medium" disable />
            <CardCourses name="The subjunctive" level="medium" disable />
          </div>
        </div>
      </section>
      {/* second row listen courses */}
      <section className="flex flex-col w-full h-2/5 mt-14 justify-center">
        <h2 className="text-white font-bold  text-3xl mb-2">Courses</h2>
        <div className="flex items-center">
          <img
            src={imgCourses}
            height={130}
            width={130}
            className="mr-10"
            alt="courses"
          />
          <div className="flex overflow-x-scroll gap-10" ref={scrollRef2}>
            {youtubeItems.map((item) => {
              const { id, snippet = {} } = item;
              const { title, thumbnails = {}, resourceId = {} } = snippet;
              const { medium = {} } = thumbnails;
              return (
                //map over component card to render every video of the playlist
                <YoutubeThumbnails
                  name={title}
                  key={id}
                  image={medium}
                  youtubeId={resourceId}
                />
              );
            })}
          </div>
        </div>
      </section>
      {/* last row stats number exercices realized etc... */}
      <section className="flex flex-col w-full">
        <h2 className="text-white font-bold  text-3xl mb-8">Stats</h2>
        <div className="flex w-full">
          <img
            src={imgChart}
            height={130}
            width={130}
            className="mr-10"
            alt="charts"
          />
          <div className="flex items-center justify-evenly w-full">
            {/* nb course finished */}
            <div className="flex flex-col text-center">
              <h2 className="text-4xl">+300</h2>
              <p className="font-semibold">Course finished</p>
            </div>
            {/* nb student */}
            <div className="flex-col flex text-center">
              <h2 className="text-4xl">+500</h2>
              <p className="font-semibold">Students</p>
            </div>
            {/* nb country */}
            <div className="flex flex-col text-center">
              <h2 className="text-4xl">+10</h2>
              <p className="font-semibold">Country</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Courses;
