import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RestaurantCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>title</CardTitle>
        <CardDescription>description</CardDescription>
      </CardHeader>
      <CardContent>content</CardContent>
      <CardFooter>footer</CardFooter>
    </Card>
  );
};

export default RestaurantCard;
