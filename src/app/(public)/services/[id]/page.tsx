
// const SingleServiceByIdPage = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const { id } = await params;
//   return <div>ServideByIdPage {id}</div>;
// };

// export default SingleServiceByIdPage














import Image from "next/image";
import {
  Badge,
} from "@/components/ui/badge";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Star,
  Clock,
  Tag,
} from "lucide-react";
import { IBookingSlot } from "@/types/types.service";
import {
  BookServiceButton,
  BookingProvider,
  SlotChoice,
} from "../_components/BookingModal";

const SingleServiceByIdPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services/${id}`,
    {
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  const slots = (data?.bookingSlots ?? []) as IBookingSlot[];

  return (
    <BookingProvider serviceId={data.id} slots={slots}>
    <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left */}
        <div className="min-w-0 space-y-8 lg:col-span-2">
          <Card className="overflow-hidden">
            <div className="relative h-64 w-full sm:h-80 lg:h-[420px]">
              <Image
                src={data.thumbnail}
                alt={data.title}
                fill
                className="object-cover"
              />
            </div>
          </Card>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>{data.category.name}</Badge>

                {data.isAvailable ? (
                  <Badge className="bg-green-600 hover:bg-green-600">
                    Available
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Unavailable
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold">
                {data.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>
                    {data.averageRating}.0 ({data.totalReviews} Reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  {data.estimatedDuration} Minutes
                </div>

                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  {data.priceType}
                </div>
              </div>

              <div>
                <h2 className="mb-3 text-xl font-semibold">
                  Description
                </h2>

                <p className="leading-7 text-muted-foreground">
                  {data.description}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-5 p-6">
              <h2 className="text-2xl font-bold">
                Booking Slots
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                {slots.length > 0 ? (
                  slots.map((slot) => <SlotChoice key={slot.id} slot={slot} />)
                ) : (
                  <p className="text-sm text-muted-foreground">
                    This service has no open slots yet.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right */}
        <div>
          <Card className="sticky top-24">
            <CardContent className="space-y-6 p-6">
              <div>
                <p className="text-muted-foreground">
                  Service Price
                </p>

                <h2 className="text-4xl font-bold text-primary">
                  OMR {data.price}
                </h2>

                <p className="text-muted-foreground">
                  {data.priceType}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Category</span>

                  <span className="font-medium">
                    {data.category.name}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Duration</span>

                  <span>{data.estimatedDuration} min</span>
                </div>

                <div className="flex justify-between">
                  <span>Rating</span>

                  <span>{data.averageRating}/5</span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>

                  <span
                    className={
                      data.isAvailable
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {data.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              <BookServiceButton disabled={!data.isAvailable || slots.length === 0} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </BookingProvider>
  );
};

export default SingleServiceByIdPage;