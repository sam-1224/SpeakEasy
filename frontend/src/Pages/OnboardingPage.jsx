import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser';
import toast from 'react-hot-toast';
import { ShuffleIcon, CameraIcon, MapPinIcon, LoaderIcon, MessagesSquareIcon } from 'lucide-react';
import useOnboarding from '../hooks/useOnboarding.js';
import { LANGUAGES } from '../constants/index.js';


const OnboardingPage = () => {

  const { authUser } = useAuthUser();

  // 1. ADD NEW STATE FOR AVATAR LOADING
  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });


  // const queryClient = useQueryClient();
  // const { mutate: onboardingMutation, isPending } = useMutation({
  //   mutationFn: completeOnboarding,
  //   onSuccess: () => {
  //     toast.success("Profile onboarded successfully!");
  //     queryClient.invalidateQueries({ queryKey: ["authUser"] });
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message || "Failed to complete onboarding");
  //   }
  // });

  const { onboardingMutation, isPending } = useOnboarding();

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  // 2. UPDATE THE AVATAR HANDLER
  const handleRandomAvatar = () => {
    setIsAvatarLoading(true); // Start loading
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatarUrl = `https://avatar.iran.liara.run/public/${idx}.png`;

    const img = new Image();
    img.src = randomAvatarUrl;

    // When the image is fully loaded in the browser's memory...
    img.onload = () => {
      setFormState({ ...formState, profilePic: randomAvatarUrl }); // Update the state
      toast.success("Random avatar generated!");
      setIsAvatarLoading(false); // Stop loading
    };
  };

  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center p-4'>
      <div className='card bg-base-200 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-center mb-6'>Complete Your Profile</h1>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden flex items-center justify-center">
                {/* 3. CONDITIONALLY RENDER THE LOADER */}
                {isAvatarLoading ? (
                  <LoaderIcon className="animate-spin size-12 text-base-content opacity-40" />
                ) : formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <CameraIcon className="size-12 text-base-content opacity-40" />
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                  disabled={isAvatarLoading} // Disable button while loading
                >

                  <ShuffleIcon className="size-4 mr-2" />

                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/* FULL NAME */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Your full name"
              />
            </div>

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                className="textarea textarea-bordered h-24"
                placeholder="Tell others about yourself and your language learning goals"
              />
            </div>

            {/* LANGUAGES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* NATIVE LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Native Language</span>
                </label>
                <select
                  name="nativeLanguage"
                  value={formState.nativeLanguage}
                  onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select your native language</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* LEARNING LANGUAGE */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Learning Language</span>
                </label>
                <select
                  name="learningLanguage"
                  value={formState.learningLanguage}
                  onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select language you're learning</option>
                  {LANGUAGES.map((lang) => (
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5 text-base-content opacity-70" />
                <input
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button className="btn btn-primary w-full" disabled={isPending} type="submit">
              {!isPending ? (
                <>
                  <MessagesSquareIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;