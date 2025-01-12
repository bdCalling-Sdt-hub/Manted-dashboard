import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useGetAboutUsQuery } from "../../redux/features/setting/settingApi";
import { Spin } from "antd"; // Importing Spin

const AboutUsPage = () => {
  const { data: aboutUsData, isLoading } = useGetAboutUsQuery();

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <>
            <IoChevronBack className="text-2xl" />
          </>
          <h1 className="text-2xl font-semibold">About Us</h1>
        </Link>
        <Link to={"/settings/edit-about-us/11"}>
          <button
            className="bg-[#038c6d] text-white flex items-center gap-2 p-2 rounded-md font-bold"
            border
          >
            <TbEdit className="size-5" />
            <span>Edit</span>
          </button>
        </Link>
      </div>

      {/* Show Spin loader if data is loading */}
      {isLoading
        ? <div className="flex justify-center items-center h-[calc(100vh-120px)]">
          <Spin />
        </div>
        : <div>
          {aboutUsData &&
            aboutUsData.map(about =>
              <p key={about._id} className="text-lg p-10">
                {/* {about.content} */}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolorem repudiandae deleniti hic asperiores fugit minus
                impedit consectetur placeat aliquid totam. Corrupti nulla,
                dolores repellendus sed ad tempora commodi magni laudantium
                optio quae eligendi dicta officia error nihil quisquam
                molestias explicabo cum aperiam doloribus sapiente magnam
                asperiores ratione vero. Quod sint, rem tempora sunt expedita
                accusamus facilis fuga atque dolorum, consequatur quidem
                voluptates rerum eveniet? Corrupti, at inventore repellendus
                sapiente, suscipit necessitatibus expedita impedit quos,
                voluptas nam sint aliquid nisi optio. Officiis sunt
                voluptatibus eos, numquam quis aspernatur dolorum optio,
                officia dicta quidem maiores mollitia fugiat quasi dolorem
                minus ipsam ipsum.
              </p>
            )}
        </div>}
    </section>
  );
};

export default AboutUsPage;
