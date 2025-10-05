'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { GalleryConfig, GalleryImage } from '@/lib/config';

interface ProjectGalleryProps {
  config?: GalleryConfig;
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
  initialDisplayCount?: number;
}

export default function ProjectGallery({
  config,
  title = "Nos Réalisations",
  subtitle = "Découvrez quelques-uns de nos projets récents",
  images = [],
  initialDisplayCount = 4
}: ProjectGalleryProps) {
  // Use config values if provided, otherwise fall back to props or defaults
  const galleryTitle = config?.title || title;
  const gallerySubtitle = config?.subtitle || subtitle;
  const galleryImages = config?.images || images;
  const galleryInitialDisplayCount = config?.initialDisplayCount || initialDisplayCount;
  const [displayCount, setDisplayCount] = useState(galleryInitialDisplayCount);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const displayedImages = galleryImages.slice(0, displayCount);
  const hasMoreImages = displayCount < galleryImages.length;

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    // Set initial slide after carousel is mounted
    setTimeout(() => {
      if (api) {
        api.scrollTo(index);
      }
    }, 50);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const showMoreImages = () => {
    setDisplayCount(images.length);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <>
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {galleryTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {gallerySubtitle}
            </p>
          </motion.div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                {image.title && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-medium">{image.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Show More Button */}
          {hasMoreImages && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={showMoreImages}
              >
                Voir plus de réalisations ({images.length - displayCount} restantes)
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-30 text-white hover:text-gray-300 transition-colors bg-black/50 rounded-full p-2"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30 text-white text-sm bg-black/70 px-4 py-2 rounded-full">
              {current} / {count}
            </div>

            {/* Carousel Container */}
            <motion.div
              className="relative w-full md:h-full flex items-center justify-center md:flex md:items-center md:justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Carousel 
                setApi={setApi}
                className="w-full h-full max-w-[95vw] max-h-[95vh]"
                opts={{
                  align: "center",
                  loop: true,
                  skipSnaps: false,
                  dragFree: false,
                  startIndex: selectedImageIndex,
                }}
              >
                <CarouselContent className="-ml-1">
                  {galleryImages.map((image, index) => (
                    <CarouselItem key={index} className="h-full flex items-center justify-center pl-0">
                      <div className="relative w-full h-full flex items-center justify-center p-2 md:p-4">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          width={1200}
                          height={800}
                          className="object-contain max-w-full max-h-full rounded-lg"
                          priority={index === current - 1}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                
                {/* Navigation Arrows - Hidden on mobile */}
                <button
                  className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
                  onClick={() => api?.scrollPrev()}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all duration-200"
                  onClick={() => api?.scrollNext()}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Carousel>

              {/* Image Info */}
              {galleryImages[current - 1]?.title && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 text-center">
                  <p className="text-white text-lg font-medium bg-black/70 px-6 py-3 rounded-lg">
                    {galleryImages[current - 1].title}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
