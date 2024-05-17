from ctgan import CTGAN
import pandas as pd

def generate_sample(dataset, categorical_features, num_samples):
    # Sample the dataset using CTGAN
    ctgan = CTGAN(verbose=True)
    ctgan.fit(dataset, categorical_features, epochs=200)
    sampled_data = ctgan.sample(num_samples)

    return sampled_data
