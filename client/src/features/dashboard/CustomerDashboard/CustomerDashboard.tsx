import MyReviews from "./components/MyReviews";
import OrderCard from "./components/OrderCard";
import ProfileOverview from "./components/ProfileOverview";

export function CustomerDashboard() {
    return(
       <>
        <ProfileOverview />
        <OrderCard orderNumber="1234" orderDate="3/19/26" total={20} status="Pending" />
        <OrderCard orderNumber="1234" orderDate="3/19/26" total={20} status="Pending" />
        <OrderCard orderNumber="1234" orderDate="3/19/26" total={20} status="Pending" />
    <MyReviews />
       </>
    )
}