import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import CustomButton from "../../utils/CustomButton";
import { useGetTermsConditionQuery } from "../../redux/features/setting/settingApi";
import { Spin } from "antd"; // Importing Spin

const TermsconditionPage = () => {
  const { data: termsConditionsData, isLoading } = useGetTermsConditionQuery();

  return (
    <section className="w-full h-full min-h-screen">
      <div className="flex justify-between items-center py-5">
        <Link to="/settings" className="flex gap-4 items-center">
          <>
            <IoChevronBack className="text-2xl" />
          </>
          <h1 className="text-2xl font-semibold">Terms of Conditions</h1>
        </Link>
        <Link to={"/settings/edit-terms-conditions/11"}>
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
          {termsConditionsData &&
            termsConditionsData.map(term =>
              <p key={term._id} className="text-lg p-10">
                {/* {term.content} */}
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim
                repellat facere laudantium voluptates! Sapiente temporibus non
                officia eligendi vitae repellendus dolorum impedit,
                consequuntur aspernatur, rem autem labore, provident quaerat
                voluptates odio. Consectetur amet quo deserunt autem? Ducimus
                quia eius, at sequi aperiam quibusdam voluptatum eligendi
                praesentium, necessitatibus hic, dolorem omnis rem quo? Ex,
                maxime? Obcaecati nesciunt harum omnis asperiores maxime
                sapiente architecto ad quae necessitatibus at? Sunt eveniet
                ipsa aliquam iusto voluptatibus quasi enim. Iste rem enim
                totam, nobis qui repudiandae nam placeat a delectus, explicabo
                dolor. Est aliquam quam explicabo ratione deleniti quidem quo,
                veritatis, commodi velit illum minus.
              </p>
            )}
        </div>}
    </section>
  );
};

export default TermsconditionPage;
