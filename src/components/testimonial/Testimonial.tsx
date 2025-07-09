import React, { memo } from "react";
import { useSelector } from "react-redux";
import Card from "../ui/Card";

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface RootState {
  theme: {
    mode: "light" | "dark";
  };
}

const testimonials: TestimonialItem[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b9fe739c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    comment:
      "Amazing quality and fast delivery! The clothes fit perfectly and the style is exactly what I was looking for. Highly recommended!",
  },
  {
    id: "2",
    name: "Mike Chen",
    role: "Software Engineer",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    comment:
      "Great customer service and excellent product quality. The shopping experience was smooth and hassle-free.",
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Marketing Manager",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5,
    comment:
      "Love the variety and trendy designs! Fashion Forward has become my go-to store for all my fashion needs.",
  },
];

const StarRating: React.FC<{ rating: number }> = memo(({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
});

StarRating.displayName = "StarRating";

const Testimonial: React.FC = memo(() => {
  const { mode } = useSelector((state: RootState) => state.theme);

  return (
    <section
      className="py-16 bg-gray-50"
      style={{
        backgroundColor: mode === "dark" ? "rgb(31 41 55)" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            What Our Customers Say
          </h2>
          <p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
          >
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their shopping experience with Fashion Forward.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <div className="flex flex-col h-full">
                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Comment */}
                <blockquote
                  className="text-gray-700 mb-6 flex-grow italic"
                  style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
                >
                  "{testimonial.comment}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div
                      className="font-semibold text-gray-900"
                      style={{ color: mode === "dark" ? "white" : "" }}
                    >
                      {testimonial.name}
                    </div>
                    <div
                      className="text-sm text-gray-600"
                      style={{
                        color: mode === "dark" ? "rgb(156 163 175)" : "",
                      }}
                    >
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p
            className="text-lg text-gray-600 mb-4"
            style={{ color: mode === "dark" ? "rgb(156 163 175)" : "" }}
          >
            Join thousands of satisfied customers
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <span>✓ Free Shipping</span>
            <span>✓ 30-Day Returns</span>
            <span>✓ 24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
});

Testimonial.displayName = "Testimonial";

export default Testimonial;
